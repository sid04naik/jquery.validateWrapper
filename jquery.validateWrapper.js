/*!
 * JQuery validateWrapper Plugin v1.19.1
 * Works well for jQuery validate Plugin v1.19.1
 * Copyright (c) 2019 Siddhant Naik
 *
 * Plugin Name: validateWrapper
 * Description: This validateWrapper plugin will run above the JQuery Validation Plugin.
 * Basically, the validateWrapper plugin will help you to validate form elements by adding a few lines of code.
 * Just use the form selector and call the wrapper plugin and the form will start validating.
*/
; (function ($) {

	"use strict";

	//Default Parameters
	let plugin;
	const PLUGIN_NAME = "validateWrapper";

	//Plugin constructor
	function Plugin(element, options) {
		this._element    = element;
		this._pluginName = PLUGIN_NAME;
		this._defaults   = $.fn[PLUGIN_NAME].defaults;

		if(typeof options == "undefined") options = {};
		this._settings   = $.extend({}, this._defaults, options);

		delete this._settings.messages;  //removing validator messages from settings
		delete this._settings.groups; // removing validator groups from settings
		delete this._settings.require_from_group; // removing validator `required_from_group`s from settings
		delete this._settings.showErrors; //removing validator errors from settings.

		if(typeof options.messages == "undefined") options.messages = {};
		if (!jQuery.isEmptyObject(options.messages) && typeof options.messages != "object") delete options.messages;

		if(typeof options.groups == "undefined") options.groups = {};
		if (!jQuery.isEmptyObject(options.groups) && typeof options.groups != "object") delete options.groups;

		if(typeof options.require_from_group == "undefined") options.require_from_group = {};
		if (!jQuery.isEmptyObject(options.require_from_group) && typeof options.require_from_group != "object") delete options.require_from_group;

		if(typeof options.showErrors == "undefined") options.showErrors = {};
		if (!jQuery.isEmptyObject(options.showErrors) && typeof options.showErrors != "object") delete options.showErrors;

		this._messages           = $.extend({}, this._defaults.messages, options.messages);
		this._groups             = $.extend({}, this._defaults.groups, options.groups);
		this._require_from_group = $.extend({}, this._defaults.require_from_group, options.require_from_group);
		this._showErrors 		 = $.extend({}, this._defaults.showErrors, options.showErrors);

		this._init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {

		// Initialization logic
		_init: function () {
			plugin = this; //storing plugin reference in plugin variable.
			plugin._build();
			plugin._validate(); //validate Function
		},

		// Cache DOM nodes for performance
		_build: function () {
			plugin.$_element = $(plugin._element);
		},

		// Bind events that trigger methods
		_bindEvents: function (selector, eventHandler,validator,task) {
			$(selector,plugin.$_element).on(eventHandler + '.' + plugin._pluginName, function () {
				switch(task) {
					case 'reset':
						if($(selector,plugin.$_element).attr('type') == "reset" || $(selector,plugin.$_element).attr('type') == "button") validator.resetForm();
					break;
					case 'validate': //validate
					default:
						if (plugin.$_element.valid()) {
							plugin._callback(plugin.$_element);
							if (plugin._settings.destroyOnCallback) plugin._unbindEvents(selector);
						}
					break;
				}
			});
		},

		// Unbind events that trigger methods
		_unbindEvents: function (selector) {
			$(selector,plugin.$_element).off('.' + plugin._pluginName);
		},

		// destroying all the instances completely
		_destroy: function (myValidator) {
			myValidator.destroy();
			plugin.$_element.removeData();
		},

		//validate wrapper
		_validate: function () {
			var myValidator;
			let validatorOptions = {
				normalizer    : (typeof plugin._settings.normalizer === "function") ? plugin._settings.normalizer : plugin._normalizer,
				highlight     : (typeof plugin._settings.highlight === "function") ? plugin._settings.highlight : plugin._highlight,
				unhighlight   : (typeof plugin._settings.unhighlight === "function") ?  plugin._settings.unhighlight : plugin._unHighlight,
				invalidHandler: (typeof plugin._settings.invalidHandler === "function") ?  plugin._settings.invalidHandler: plugin._inValidHandler,
				groups        : (typeof plugin._groups === "object") ? plugin._groups : null,
				errorPlacement: (typeof plugin._settings.errorPlacement === "function") ? plugin._settings.errorPlacement : plugin._errorPlacement,
				submitHandler : function (form, event) {
					plugin._callback(form, event);
					if (plugin._settings.destroyOnCallback)
						plugin._destroy(myValidator);
				},
			};
			let validateObj = $.extend({}, plugin._settings, validatorOptions);
			myValidator = plugin.$_element.validate(validateObj); //jquery.validate Function
			plugin._additionalMethod(myValidator); //additional validator methods
		},

		//additional functions of jquery validate listed here.
		_additionalMethod: function (myValidator) {
			//Default validator messages
			jQuery.extend(jQuery.validator.messages, plugin._messages);

			//Rule to set require_from_group validation
			for (let key in plugin._require_from_group) {
				jQuery.validator.addClassRules(key, {
					'require_from_group': [plugin._require_from_group[key], '.' + key]
				});
			}

			//applying custom messages for require_from_group items
			for (let i in plugin._require_from_group) {
				for (let j in plugin._messages) {
					if (i == j) {
						if (plugin._messages[j] != '') {
							$('.' + j).each(function () {
								if ($("[name=" + this.name + "]", plugin.$_element).length) {
									$("[name=" + this.name + "]", plugin.$_element).rules("add", {
										messages: { 'require_from_group': plugin._messages[j] }
									});
								}
							});
						}
					}
				}
			}

			//applying custom messages for groups items
			for (let i in plugin._groups) {
				for (let j in plugin._messages) {
					if (i == j) {
						if (plugin._messages[j] != '') {
							$('.' + j).each(function () {
								if ($("[name=" + this.name + "]", plugin.$_element).length) {
									$("[name=" + this.name + "]", plugin.$_element).rules("add", {
										messages: { required: plugin._messages[j] }
									});
								}
							});
						}
					}
				}
			}

			//overriding email validation.
			jQuery.validator.addMethod("email", function (value) {
				if (value == '')
					return true;
				let index,regex,str1,str2,str3;
				index = value.indexOf('@');
				str1  = value.substr(0, index);
				if ((str1.lastIndexOf('_') == (str1.length - 1)) || (str1.lastIndexOf('.') == (str1.length - 1)) || (str1.lastIndexOf('-') == (str1.length - 1)))
					return false;
				str2 = value.substr(index + 1);
				str3 = str2.substr(0, str2.indexOf('.'));
				if (str3.lastIndexOf('-') == (str3.length - 1) || (str3.indexOf('-') != str3.lastIndexOf('-')))
					return false;
				regex = /(^[a-zA-Z0-9]+[._-]{0,1})+([a-zA-Z0-9]+[_]{0,1})*@([a-zA-Z0-9]+[-]{0,1})+(.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/;
				return regex.test(value);
			});

			//age validation
			jQuery.validator.addMethod("age", function (value) {
				let regex = /^\d{0,3}$/;
				return regex.test(value);
			});

			//validation for ckeditor
			jQuery.validator.addMethod("ckeditor_required", function (value, element) {
				let editorId  = $(element).attr('id');
				let editor    = CKEDITOR.instances[editorId];
				value = editor.getData().replace(/<[^>]*>/gi, '').trim();
				if (value.length === 0)
					$(element).val(value);
				else
					$(element).val(editor.getData());
				return $(element).val().length > 0;
			});

			//additional validators methods
			let additionalFunction = plugin._settings.addToValidator;
			if (typeof additionalFunction === "function") additionalFunction(plugin.$_element,myValidator);

			if (plugin._settings.validateOnLoad) myValidator.form(); //validating form on page load
			if (plugin._settings.validateOnClick) plugin._bindEvents('._validate_oc', 'click'); //validating form on element click
			if (plugin._settings.validateOnKeyPress) plugin._bindEvents('._validate_kp', 'keypress'); //validating form on element keypress
			if (plugin._settings.resetValidator) plugin._bindEvents('._reset_validator','click',myValidator,'reset'); //reset form on element click

			myValidator.showErrors(plugin._showErrors);
		},

		_normalizer: function(value) {
			return $.trim(value);
		},

		_highlight: function (element, errorClass, validClass) {
			if(jQuery(element).next().hasClass('input-group-append'))
				jQuery(element).next().children().addClass(errorClass).removeClass(validClass);
			if (jQuery(element).prev().hasClass('input-group-prepend'))
				jQuery(element).prev().children().addClass(errorClass).removeClass(validClass);
			if (jQuery(element).is('input[type=radio]'))
				$("input[name='"+element.name+"']").addClass(errorClass).removeClass(validClass);
			else
				jQuery(element).addClass(errorClass).removeClass(validClass);
		},

		_unHighlight: function (element, errorClass, validClass) {
			if(jQuery(element).next().hasClass('input-group-append'))
				jQuery(element).next().children().removeClass(errorClass).addClass(validClass);
			if (jQuery(element).prev().hasClass('input-group-prepend'))
				jQuery(element).prev().children().removeClass(errorClass).addClass(validClass);
			if (jQuery(element).is('input[type=radio]'))
				$("input[name='"+element.name+"']").removeClass(errorClass).addClass(validClass);
			else
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
			else if (element.next().hasClass('input-group-append') ||
				element.prev().hasClass('input-group-prepend') ||
				element.hasClass('append-msg-to-parent')
			)
				error.insertAfter(element.parent());
			else if (element.is('input[type=checkbox]') || element.is('input[type=radio]'))
				element.closest('.form-check').parent().append(error);
			else if (element.hasClass('required-from-group')) {
				for (let k in plugin._require_from_group) {
					let lastElement = $('.' + k + ':last');
					if ($(element).attr('name') == $(lastElement).attr('name')) {
						error.insertAfter(lastElement.parent().parent());
						break;
					}
				}
			} else if (element.hasClass('group-in-one')) {
				for (let key in plugin._groups) {
					if (element.hasClass(key)) {
						let lastEl = $('.' + key + ':last');
						error.insertAfter(lastEl.parent().parent());
						break;
					}
				}
			} else
				error.insertAfter(element);
		},

		// Callback methods
		_callback: function (form,event=null) {
			let onComplete = plugin._settings.onComplete;
			if (typeof onComplete === "function") onComplete(form,event);
		}
	});

	//Plugin Wrapper
	$.fn[PLUGIN_NAME] = function (options) {
		this.each(function () {
			if (!$.data(this, "plugin_" + PLUGIN_NAME)) {
				$.data(this, "plugin_" + PLUGIN_NAME, new Plugin(this, options));
			}
		});
		return this;
	};

	//setting Default values
	$.fn[PLUGIN_NAME].defaults = {
		ignore            : ":hidden:not(.hidden-required, .editor-required), .ignore",
		errorClass        : 'error',
		errorElement      : 'div',
		validClass        : 'success',
		groups            : null,
		require_from_group: null,
		normalizer        : null,
		validateOnLoad    : false,
		validateOnClick   : false,
		validateOnKeyPress: false,
		resetValidator    : false,
		destroyOnCallback : false,
		highlight         : null,
		unhighlight       : null,
		invalidHandler    : null,
		errorPlacement    : null,
		addToValidator    : null,
		onComplete        : null,
		messages          : { //JQuery validator default messages
			require_from_group: jQuery.validator.format("Please fill out at least {0} of these fields."),
			age               : "Please enter valid age."
		},
		showErrors: null
	};
})(jQuery);