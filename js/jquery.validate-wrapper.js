//https://john-dugan.com/jquery-plugin-boilerplate-explained/
; (function ($, window, undefined) {

	"use strict";

	//Default Parameters
	var pluginName = "validateWrapper",
	    defaults   = {
			variables: { //default variables.
				ignore      : ":hidden:not(.hidden-required), .ignore-validate",
				errorClass  : 'error',
				errorElement: 'div',
				validClass  : 'valid',
				focusInvalid: false
			},
			methods: { //default methods
				highlight     : null,
				unhighlight   : null,
				invalidHandler: null,
				errorPlacement: null,
				onComplete    : null,   //callback function called in submitHandler
			},
			validatorMessages: { //JQuery validator default messages
				require_from_group: jQuery.validator.format("Please fill out all {0} fields."),
			}

		};

	// Plugin constructor
	function Plugin(element, options) {
		this.element   = element;
		this.settings  = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name     = pluginName;
		this._initialize();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		_initialize: function () {
			this._validate(); //validate Function
			this._additionMethod(); //additional methods
		},
		_validate: function () {
			var plugin = this;
			//jquery.valdate Function
			$(this.element).validate({
				ignore        : this.settings.variables.ignore,
				errorClass    : this.settings.variables.errorClass,
				errorElement  : this.settings.variables.errorElement,
				validClass    : this.settings.variables.validClass,
				focusInvalid  : this.settings.variables.focusInvalid,
				highlight     : ($.isFunction(this.settings.methods.highlight)) ? this.settings.methods.highlight          : this._highlight,
				unhighlight   : ($.isFunction(this.settings.methods.unhighlight)) ? this.settings.methods.unhighlight      : this._unHighlight,
				invalidHandler: ($.isFunction(this.settings.methods.invalidHandler)) ? this.settings.methods.invalidHandler: this._inValidHandler,
				errorPlacement: ($.isFunction(this.settings.methods.errorPlacement)) ? this.settings.methods.errorPlacement: this._errorPlacement,
				submitHandler : function (form) {
					plugin._callback(form);
				},
			});
		},
		_additionMethod: function () {
			//Default validator messages
			jQuery.extend(jQuery.validator.messages, this.settings.validatorMessages);

			//Rule to set group validation
			jQuery.validator.addClassRules('group-all-together', {
				'require_from_group': [jQuery('.group-all-together').length, '.group-all-together']
			});

		},
		_callback: function (form) { //Callback Function for Jquery.validate
			var onComplete = this.settings.methods.onComplete;
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
