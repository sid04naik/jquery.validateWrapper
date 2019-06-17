//https://john-dugan.com/jquery-plugin-boilerplate-explained/
; (function ($, window, undefined) {

	"use strict";

	//Default Parameters
	var pluginName = "validateWrapper",
	    defaults   = {
			ignore           : ":hidden:not(.hidden-required), .ignore-validate",
			errorClass       : 'error',
			errorElement     : 'div',
			validClass       : 'valid',
			focusInvalid     : false,
			highlight        : null,
			unhighlight      : null,
			invalidHandler   : null,
			errorPlacement   : null,
			onComplete       : null, //callback function called in submitHandler
			validatorMessages: { //JQuery validator default messages
				require_from_group: jQuery.validator.format("Please fill out all {0} fields.")
			}

		};

	// Plugin constructor
	function Plugin(element, options) {
		this.element           = element;
		this.settings          = $.extend({}, defaults, options); delete this.settings.validatorMessages;  //removing validator messages from settings
		this.validatorMessages = $.extend({}, defaults.validatorMessages, options.validatorMessages);      //extending validators messages
		this._defaults         = defaults;
		this._name             = pluginName;
		this._initialize();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		_initialize: function () {
			this._validate(); //validate Function
			this._additionMethod(); //additional validator methods
		},
		_validate: function () {
			var plugin = this;
			//jquery.validate Function
			$(this.element).validate({
				ignore        : this.settings.ignore,
				errorClass    : this.settings.errorClass,
				errorElement  : this.settings.errorElement,
				validClass    : this.settings.validClass,
				focusInvalid  : this.settings.focusInvalid,
				highlight     : ($.isFunction(this.settings.highlight)) ? this.settings.highlight          : this._highlight,
				unhighlight   : ($.isFunction(this.settings.unhighlight)) ? this.settings.unhighlight      : this._unHighlight,
				invalidHandler: ($.isFunction(this.settings.invalidHandler)) ? this.settings.invalidHandler: this._inValidHandler,
				errorPlacement: ($.isFunction(this.settings.errorPlacement)) ? this.settings.errorPlacement: this._errorPlacement,
				submitHandler : function (form) {
					plugin._callback(form);
				},
			});
		},
		_additionMethod: function () {
			//Default validator messages
			jQuery.extend(jQuery.validator.messages, this.validatorMessages);

			//Rule to set group validation
			jQuery.validator.addClassRules('group-all-together', {
				'require_from_group': [jQuery('.group-all-together').length, '.group-all-together']
			});
		},
		_callback: function (form) { //Callback Function for Jquery.validate
			var onComplete = this.settings.onComplete;
			if ($.isFunction(onComplete))
				onComplete(form);
			else
				console.log('Default callback function is called..');
		},
		//Jquery Validator Function default definition
		_highlight: function (element, errorClass, validClass) {
			jQuery(element).addClass(errorClass).removeClass(validClass);
		},
		_unHighlight: function (element, errorClass, validClass) {
			jQuery(element).removeClass(errorClass).addClass(validClass);
		},
		_inValidHandler: function (form, validator) {
			if (!validator.numberOfInvalids())
				return;
			$('html, body').animate({
				scrollTop: ($(validator.errorList[0].element)).offset().top - 100
			}, 100);
		},
		_errorPlacement: function (error, element) {
			if (element.attr('hide-validation-message') == 'true')
				return true;
			else if (element.next().hasClass('input-group-append') || element.prev().hasClass('input-group-prepend') || element.hasClass('append-msg-to-parent'))
				error.insertAfter(element.parent());
			else if (element.is('input[type=checkbox]') || element.is('input[type=radio]'))
				element.closest('.form-check').parent().append(error);
			else if (element.hasClass('group-all-together')) {
				var lastElement = $('.group-all-together:last');
				if ($(element).attr('name') == $(lastElement).attr('name'))
					error.insertAfter(lastElement.parent().parent());
			} else
				error.insertAfter(element);
		}
	});

	//Plugin Wrapper
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
