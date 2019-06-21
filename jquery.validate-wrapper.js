/*
	Plugin Name: validateWrapper
	Description: This wrapper plugin will run above the JQuery Validation Plugin.
	Basically, the wrapper plugin will help you to validate form elements by adding a few lines of code. Just use the form selector and call the wrapper plugin and the form will start validating. This will help the developers to maintain a single file for all the form. It will also help the developers in terms of code redundancy, latency, and many other aspects.
*/
; (function ($, window, document, undefined) {

	"use strict";

	//Default Parameters
	var pluginName = "validateWrapper";
	//Plugin constructor
	function Plugin(element, options) {
		this._element    = element;
		this._pluginName = pluginName;
		this._defaults   = $.fn[pluginName].defaults;
		this._settings 	 = $.extend({}, this._defaults, options);
		delete this._settings.validatorMessages;  //removing validator messages from _settings
		if(options.validatorMessages && typeof options.validatorMessages != "object") delete options.validatorMessages;
		//extending validators messages
		this._validatorMessages = $.extend({}, this._defaults.validatorMessages, options.validatorMessages);
		this._init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		// Initialization logic
		_init: function () {
			this._build();
			this._validate(); //validate Function
			this._additionalMethod(); //additional validator methods
		},
		// Cache DOM nodes for performance
		_build: function () {
			this.$_element = $(this._element);
		},
		// Remove plugin instance completely
		_destroy: function () {
			this.$_element.removeData();
		},
		_validate: function () {
			var plugin = this;
			//jquery.validate Function
			this.$_element.validate({
				ignore        : this._settings.ignore,
				errorClass    : this._settings.errorClass,
				errorElement  : this._settings.errorElement,
				validClass    : this._settings.validClass,
				focusInvalid  : this._settings.focusInvalid,
				highlight     : ($.isFunction(this._settings.highlight)) ? this._settings.highlight          : this._highlight,
				unhighlight   : ($.isFunction(this._settings.unhighlight)) ? this._settings.unhighlight      : this._unHighlight,
				invalidHandler: ($.isFunction(this._settings.invalidHandler)) ? this._settings.invalidHandler: this._inValidHandler,
				errorPlacement: ($.isFunction(this._settings.errorPlacement)) ? this._settings.errorPlacement: this._errorPlacement,
				submitHandler : function (form) {
					plugin._callback(form);
				},
			});
		},
		_additionalMethod: function () {
			//Default validator messages
			jQuery.extend(jQuery.validator.messages, this._validatorMessages);
			//Rule to set group validation
			jQuery.validator.addClassRules('group-all-together', {
				'require_from_group': [jQuery('.group-all-together').length, '.group-all-together']
			});
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
		},
		// Callback methods
		_callback: function (form) { //Callback Function for Jquery.validate
			var onComplete = this._settings.onComplete;
			if ($.isFunction(onComplete))
				onComplete.call(form);
			else
				console.log('Default callback function is called..');
		}
	});

	//Plugin Wrapper
	$.fn[pluginName] = function (options) {
		this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
		return this;
	};
	//setting Default values
	$.fn[pluginName].defaults = {
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
})(jQuery, window, document);
