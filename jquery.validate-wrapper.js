/*!
 * JQuery Validation Wrapper Plugin v.1.19.1 - 27 Jun 19
 * Works well for jQuery Validation Plugin v1.19.1
 * Copyright (c) 2019 Siddhant Naik
 *
 * Plugin Name: validateWrapper
 * Description: This wrapper plugin will run above the JQuery Validation Plugin.
 * Basically, the wrapper plugin will help you to validate form elements by adding a few lines of code.
 * Just use the form selector and call the wrapper plugin and the form will start validating.
*/
; (function ($, window, document, undefined) {

	"use strict";

	//Default Parameters
	let plugin, pluginName = "validateWrapper";

	//Plugin constructor
	function Plugin(element, options) {
		this._element    = element;
		this._pluginName = pluginName;
		this._defaults   = $.fn[pluginName].defaults;
		this._settings   = $.extend({}, this._defaults, options);
		delete this._settings.messages;  //removing validator messages from _settings
		delete this._settings.groups; // removing defined validate group from _settings
		delete this._settings.require_from_group; // removing defined required_from_group from _settings

		if (options.messages && typeof options.messages != "object") delete options.messages;
		if (options.groups && typeof options.groups != "object") delete options.groups;
		if (options.require_from_group && typeof options.require_from_group != "object") delete options.require_from_group;

		this._messages           = $.extend({}, this._defaults.messages, options.messages);
		this._groups             = $.extend({}, this._defaults.groups, options.groups);
		this._require_from_group = $.extend({}, this._defaults.require_from_group, options.require_from_group);

		this._init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {

		// Initialization logic
		_init: function () {
			plugin = this;
			this._build();
			this._validate(); //validate Function
		},

		// Cache DOM nodes for performance
		_build: function () {
			this.$_element = $(this._element);
		},

		// Bind events that trigger methods
		_bindEvents: function (selector, event) {
			$(selector).on(event + '.' + plugin._pluginName, function () {
				let form = $('form');
				if (form.valid()) {
					plugin._callback(form);
					if (plugin._settings.destroyOnCallback)
						plugin._unbindEvents(selector);
				}
			});
		},

		// Unbind events that trigger methods
		_unbindEvents: function (selector) {
			$(selector).off('.' + this._pluginName);
		},

		// Remove plugin instance completely
		_destroy: function (myValidator) {
			myValidator.destroy();
			this.$_element.removeData();
		},

		//validate wrapper
		_validate: function () {
			var myValidator;
			let extraParams = {
				highlight     : (typeof this._settings.highlight === "function") ? this._settings.highlight : this._highlight,
				unhighlight   : (typeof this._settings.unhighlight === "function") ?  this._settings.unhighlight      : this._unHighlight,
				invalidHandler: (typeof this._settings.invalidHandler === "function") ?  this._settings.invalidHandler : this._inValidHandler,
				groups        : (typeof this._groups === "object") ? this._groups  : null,
				errorPlacement: (typeof this._settings.errorPlacement === "function") ? this._settings.errorPlacement: this._errorPlacement,
				submitHandler : function (form) {
					plugin._callback(form);
					if (plugin._settings.destroyOnCallback)
						plugin._destroy(myValidator);
				},
			};
			let validateObj = $.extend({}, this._settings, extraParams);
			//jquery.validate Function
			    myValidator = this.$_element.validate(validateObj);
			this._additionalMethod(myValidator); //additional validator methods
		},

		//additional functions of jquery validate listed here.
		_additionalMethod: function (myValidator) {
			//Default validator messages
			jQuery.extend(jQuery.validator.messages, this._messages);

			//Rule to set require_from_group validation
			for (let key in this._require_from_group) {
				jQuery.validator.addClassRules(key, {
					'require_from_group': [this._require_from_group[key], '.' + key]
				});
			}

			//applying custom messages for require_from_group items
			for (let i in this._require_from_group) {
				for (let j in this._messages) {
					if (i == j) {
						if (this._messages[j] != '') {
							$('.' + j).each(function () {
								if ($("#" + this.id, plugin.$_element).length) {
									$("#" + this.id, plugin.$_element).rules("add", {
										messages: { 'require_from_group': plugin._messages[j] }
									});
								}
							});
						}
					}
				}
			}

			//applying custom messages for groups items
			for (let i in this._groups) {
				for (let j in this._messages) {
					if (i == j) {
						if (this._messages[j] != '') {
							$('.' + j).each(function () {
								if ($("#" + this.id, plugin.$_element).length) {
									$("#" + this.id, plugin.$_element).rules("add", {
										messages: { required: plugin._messages[j] }
									});
								}
							});
						}
					}
				}
			}

			//validation for ckeditor
			jQuery.validator.addMethod("ckeditor_required", function (value, element) {
				let editorId  = $(element).attr('id');
				let editor    = CKEDITOR.instances[editorId];
				let editorTxt = CKEDITOR.instances[editorId].getData().replace(/<[^>]*>/gi, '').trim();
				if (editorTxt.length === 0)
					$(element).val(editorTxt);
				else
					$(element).val(editor.getData());
				return $(element).val().length > 0;
			});

			//additional validators methods
			if (typeof this._settings.addToValidator === "function")
				this._settings.addToValidator.call();

			//validating form on page load
			if (this._settings.validateOnLoad) myValidator.form();
			//validating form on click of element
			if (this._settings.validateOnClick) this._bindEvents('._validate_oc', 'click');
			//validating form on click of element
			if (this._settings.validateOnKeyPress) this._bindEvents('._validate_kp', 'keypress');

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
		_callback: function (form) {
			let onComplete = this._settings.onComplete;
			if (typeof onComplete === "function") {
				onComplete(form);
			} else
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
		ignore            : ":hidden:not(.hidden-required, .editor-required), .ignore",
		errorClass        : 'error',
		errorElement      : 'div',
		validClass        : 'success',
		highlight         : null,
		unhighlight       : null,
		invalidHandler    : null,
		errorPlacement    : null,
		onComplete        : null,
		groups            : null,
		require_from_group: null,
		addToValidator    : null,
		validateOnLoad    : false,
		validateOnClick   : false,
		validateOnKeyPress: false,
		destroyOnCallback : false,
		messages          : { //JQuery validator default messages
			remote            : jQuery.validator.format("{0} is not available."),
			require_from_group: jQuery.validator.format("Please fill out all {0} fields.")
		}
	};
})(jQuery, window, document);