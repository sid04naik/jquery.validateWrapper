# jquery.vallidate-wrapper

This wrapper plugin will run above the **JQuery Validation Plugin**.

Basically, the wrapper plugin will help you to validate form elements by adding a few lines of code. Just use the form selector and call the wrapper plugin and the form will start validating. 
This will help the developers to maintain a single file for all the form. It will also help the developers in terms of code redundancy, latency, and many other aspects.

Below is the documentation please follow them to get started with Jquery.validate-wrapper.

---
## Demo URL's
*   [Demo with Default Parameters](https://sid04naik.github.io/jquery.vallidate-wrapper/default-demo.html)
*   [Demo with all valid Parameters](https://sid04naik.github.io/jquery.vallidate-wrapper/demo-with-params.html)

## Prerequisites
*   JQuery.
*   JQuery Validate Plugin.
*   Additional-methods for Jquery Validator.
```js
// required plugins.
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/additional-methods.min.js"></script>
```

## Documentation
*   Download Jquery.validate-wrapper Plugin by clicking on [Download Plugin](https://github.com/sid04naik/jquery.vallidate-wrapper)
*   load the Jquery
```js
<script src="js/jquery.validate-wrapper.min.js"> </script>
```
*   Initializing the pluign with default Settings
```js
$('form').validateWrapper();
```
Note: Selector should be always reference to a form element.
*  Adding user defined settings.
You can add your own settings by simply specifying then as given below.
1.   Setting "ignore" value.
```js
$('form').validateWrapper({
  ignore  : ":hidden:not(.hidden-required)",
});
```
2.    Setting error class.
```js
$('form').validateWrapper({
  errorClass  : 'error-fld',
});
```
3.    Setting error element.
```js
$('form').validateWrapper({
  errorElement  : 'p',
});
```
4.    Setting valid class.
  ```js
$('form').validateWrapper({
  validClass  : 'valid-fld',
});
```
5.    Setting focus invalid.
```js
$('form').validateWrapper({
  focusInvalid  : false,
});
```
6.    Field highlighting settings.
```js
$('form').validateWrapper({
  highlight : function (element, errorClass, validClass) {
				//Your logic comes here.
	},
});
```
7.    Field unhighlighting settings.
```js
$('form').validateWrapper({
  unhighlight : function (element, errorClass, validClass) {
    //Your logic comes here.
  },
});
```
8.    Invalid field handling settings.
```js
$('form').validateWrapper({
  invalidHandler  : function (form, validator) {
    //Your logic comes here.
  },
});
```
9.    Error message placement settings.
```js
$('form').validateWrapper({
  errorPlacement  : function (error, element) {
    //Your logic comes here.
  },
});
```
10.   Callback function called in SubmitHandler.
```js
$('form').validateWrapper({
  onComplete  : function (form) {
	  //Your logic comes here.
	},
});
```
*   Adding and modifying validator messages.
```js
$('form').validateWrapper({
  validatorMessages: {
    required: "Please don't keep the field empty.", //modifying the message.
		validEmail: "Please enter valid email."  //adding new validator Message for custom validarion method.
	},
});
```
Note: You can define custom validation using *jQuery.validator.addMethod* anywhere in your code.
```js
jQuery.validator.addMethod("validEmail", function (value, element) {
  //Your logic comes here.
});
```
