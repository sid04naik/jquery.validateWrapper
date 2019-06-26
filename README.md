# jquery.validate-wrapper

This wrapper plugin will run above the **[JQuery Validation Plugin](https://jqueryvalidation.org/)**.

Basically, the wrapper plugin will help you to validate form elements by adding a few lines of code. Just use the form selector and call the wrapper plugin and the form will start validating. 
This will help the developers to maintain a single file for all the form. It will also help the developers in terms of code redundancy, latency, and many other aspects.

Below is the documentation please follow them to get started with Jquery.validate-wrapper.

---
## Prerequisites
* JQuery.
* JQuery Validate Plugin.
* Additional-methods for Jquery Validator.

```js
// required plugins.
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/additional-methods.min.js"></script>
```

## [Documentation](https://sid04naik.github.io/jquery.validate-wrapper/)
* Download jquery.validate-wrapper Plugin by clicking on [Download Plugin](https://github.com/sid04naik/jquery.validate-wrapper).
* Load the jquery.validate-wrapper.

```js
<script src="../jquery.validate-wrapper.min.js"> </script> //minified
<script src="../jquery.validate-wrapper.js"> </script> //non minified
```
* Initializing the plugin with default Settings.

```js
$('form').validateWrapper();
```

Note: Selector should be always reference to a form element.
* Adding user defined settings.
You can add your own settings by simply specifying then as given below.
1. Setting `ignore`.

```js
$('form').validateWrapper({
	ignore  : ":hidden:not(.hidden-required)",
});
```

2. Setting `errorClass`.

```js
$('form').validateWrapper({
	errorClass  : 'error-fld',
});
```

3. Setting `errorElement`.

```js
$('form').validateWrapper({
	errorElement  : 'p',
});
```

4. Setting `validClass`.

```js
$('form').validateWrapper({
	validClass  : 'valid-fld',
});
```


5. Field highlighting settings.

```js
$('form').validateWrapper({
	highlight : function (element, errorClass, validClass) {
	//Your logic comes here.
	},
});
```

6. Field unhighlighting settings.

```js
$('form').validateWrapper({
	unhighlight : function (element, errorClass, validClass) {
    	//Your logic comes here.
  	},
});
```

7. Invalid field handling settings.

```js
$('form').validateWrapper({
	invalidHandler  : function (form, validator) {
    	//Your logic comes here.
  	},
});
```

8. Error message placement settings.

```js
$('form').validateWrapper({
	errorPlacement  : function (error, element) {
    	//Your logic comes here.
  	},
});
```

9. Callback function called in SubmitHandler.
    
```js
$('form').validateWrapper({
	onComplete  : function (form) {
	//Your logic comes here.
	},
});
```

* Adding and modifying validator messages.

```js
$('form').validateWrapper({
	messages: {
		required	: "Please don't keep the field empty.", //modifying the message.
    	valid_email : "Please enter valid email."  //adding new validator Message for custom validation method.
  	},
});
```

Note: You can define custom validation using *jQuery.validator.addMethod* anywhere in your code.

```js
jQuery.validator.addMethod("valid_email", function (value, element) {
//Your logic comes here.
});
```

* Hiding error messages for some fields.
Just add  `hide-validation-message = true` as a attribute for the element.

```html
<input type="text" class="form-control" hide-validation-message=true id="username" name="username" required="true" />
```

* Adding group validation and setting message to the group.
1. Group the fields together.
   
```js
$('form').validateWrapper({
	groups: {
		nameGroup: "first_name last_name" //nameGroup is a groupName
	}
});
```
2. Set the "groupName" as the class name for the fields. Also add `group-in-one` class for the field.

```html
<input type="text" class="form-control nameGroup group-in-one" id="first_name" name="first_name" required="true" />
<input type="text" class="form-control nameGroup group-in-one" id="last_name" name="last_name" required="true" />
```

3. To set different message for the group.

```js
$('form').validateWrapper({
	messages: {
		nameGroup: "Please enter full name"
	}
});
```

* Add `require_from_group` validation
`require_from_group` ensures a given number of fields in a group are complete.
1. You just have to add class `require_from_group` for the element and add a `group_class`.

```html
<!-- 
dobRequiredGroup is set as group class for these fields. you can have multiple group_classes
-->
<select class="form-control dobRequiredGroup require_from_group" name="day" >
	<option value="">--Please Select--</option>
</select>
<select class="form-control dobRequiredGroup require_from_group" name="month" >
	<option value="">--Please Select--</option>
</select>
<select class="form-control dobRequiredGroup require_from_group" name="year" >
	<option value="">--Please Select--</option>
</select>
```

2. Add number fields to validate form the group.
   
```js
$('form').validateWrapper({
	require_from_group:{
		dobRequiredGroup : 2,
	},
});
```
   
## Demo URL's
*   [Demo with Default Parameters](https://sid04naik.github.io/jquery.validate-wrapper/demo/default-demo.html)
*   [Demo with all valid Parameters](https://sid04naik.github.io/jquery.validate-wrapper/demo/demo-with-params.html)
