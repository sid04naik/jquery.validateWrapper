/*
	Plugin Name: validateWrapper
	Description: This wrapper plugin will run above the JQuery Validation Plugin.
	Basically, the wrapper plugin will help you to validate form elements by adding a few lines of code. Just use the form selector and call the wrapper plugin and the form will start validating. This will help the developers to maintain a single file for all the form. It will also help the developers in terms of code redundancy, latency, and many other aspects.
*/
; (function ($, window, document, undefined) {

	"use strict";

	//Default Parameters
	var pluginName = "validateWrapper";
	var plugin;

	//Plugin constructor
	function Plugin(element, options) {
		this._element    = element;
		this._pluginName = pluginName;
		this._defaults   = $.fn[pluginName].defaults;
		this._settings   = $.extend({}, this._defaults, options);
		delete this._settings.messages;  //removing validator messages from _settings
		delete this._settings.groups; // removing defined validate group from _settings
		delete this._settings.require_from_group; // removing defined required_from_group from _settings
		if (options.messages && typeof options.messages != "object")
			delete options.messages;

		if (options.groups && typeof options.groups != "object") delete options.groups;

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

		// Remove plugin instance completely
		_destroy: function () {
			this.$_element.removeData();
		},

		//validate wrapper
		_validate: function () {
			let extraParams = {
				highlight     : (typeof this._settings.highlight === "function") ? this._settings.highlight          : this._highlight,
				unhighlight   : (typeof this._settings.unhighlight === "function") ? this._settings.unhighlight      : this._unHighlight,
				invalidHandler: (typeof this._settings.invalidHandler === "function") ? this._settings.invalidHandler: this._inValidHandler,
				groups        : (typeof this._groups === "object") ? this._groups              : null,
				errorPlacement: (typeof this._settings.errorPlacement === "function") ? this._settings.errorPlacement: this._errorPlacement,
				submitHandler : function (form) {
					plugin._callback(form);
					validator.destroy();
				},
			};
			let validateObj = $.extend({}, this._settings, extraParams);
			//jquery.validate Function
			var validator = this.$_element.validate(validateObj);
			this._additionalMethod(validator); //additional validator methods
		},

		//additional functions of jquery validate listed here.
		_additionalMethod: function (validator) {
			//Default validator messages
			jQuery.extend(jQuery.validator.messages, this._messages);

			//Rule to set require_from_group validation
			for (var key in this._require_from_group) {
				jQuery.validator.addClassRules(key, {
					'require_from_group': [this._require_from_group[key], '.' + key]
				});
			}
			//Rule to set group validation
			for (var i in this._groups) {
				for (var j in this._messages) {
					if (i == j) {
						if (this._messages[j] != '') {
							$('.' + j).each(function () {
								if($("#" + this.id,plugin.$_element).length) {
									$("#" + this.id,plugin.$_element).rules("add", {
										messages: { required: plugin._messages[j] }
									});
								}
							});
						}
					}
				}
			}

			//additional validators methods
			if(typeof this._settings.addToValidator === "function")
				this._settings.addToValidator.call();

			//validating form on page load
			if(this._settings.validateOnLoad) validator.form();
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
				for (var k in plugin._require_from_group) {
					var lastElement = $('.' + k + ':last');
					if ($(element).attr('name') == $(lastElement).attr('name')) {
						error.insertAfter(lastElement.parent().parent());
						break;
					}
				}
			} else if (element.hasClass('group-in-one')) {
				for (var key in plugin._groups) {
					if (element.hasClass(key)) {
						var lastEl = $('.' + key + ':last');
						error.insertAfter(lastEl.parent().parent());
						break;
					}
				}
			} else
				error.insertAfter(element);
		},

		// Callback methods
		_callback: function (form) {
			var onComplete = this._settings.onComplete;
			if (typeof onComplete === "function") {
				onComplete(form);
			}else
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
		ignore            : ":hidden:not(.hidden-required), .ignore",
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
		messages          : { //JQuery validator default messages
			require_from_group: jQuery.validator.format("Please fill out all {0} fields.")
		}
	};
})(jQuery, window, document);
