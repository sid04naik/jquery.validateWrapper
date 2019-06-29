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

* Form tag.
  
```html
<form action="#" name="demoForm" method="POST" novalidate="novalidate" onsubmit="return false;">
```

Note: `name` , `novalidate` and `onsubmit` attributes must to set.


## [Documentation](https://sid04naik.github.io/jquery.validate-wrapper/)
* Download jquery.validate-wrapper Plugin by clicking on [Download Plugin](https://github.com/sid04naik/jquery.validate-wrapper).
* Load the jquery.validate-wrapper.

### CDN
- [https://d37xf8bn4ru1eg.cloudfront.net/jquery-validate-wrapper/1.19.1/jquery.validate-wrapper.min.js](https://d37xf8bn4ru1eg.cloudfront.net/jquery-validate-wrapper/1.19.1/jquery.validate-wrapper.min.js)
- [https://d37xf8bn4ru1eg.cloudfront.net/jquery-validate-wrapper/1.19.1/jquery.validate-wrapper.js](https://d37xf8bn4ru1eg.cloudfront.net/jquery-validate-wrapper/1.19.1/jquery.validate-wrapper.js)

```js
<script src="https://d37xf8bn4ru1eg.cloudfront.net/jquery-validate-wrapper/1.19.1/jquery.validate-wrapper.min.js"> </script> //minified
<script src="https://d37xf8bn4ru1eg.cloudfront.net/jquery-validate-wrapper/1.19.1/jquery.validate-wrapper.js"> </script> //non minified
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

10. Calling validator on page load.

```js
$('form').validateWrapper({
	validateOnLoad    : true
});
```

11. Calling validator on click event.
Set `validateOnClick` as true and add class `_validate_oc` to the element on which you want to trigger validation.

```js
$('form').validateWrapper({
	validateOnClick    : true
});
```
```html
<button type="button" name="Button" class="btn btn-primary _validate_oc">Button</button>
```

12.  Calling validator on keypress event.
Set `validateOnKeyPress` as true and add class `_validate_kp` to the element on which you want to trigger validation.

```js
$('form').validateWrapper({
	validateOnKeyPress    : true
});
```
```html
<input type="text" class="form-control _validate_kp" id="email" name="email" required="true" />
```

13.  Destroy Validator once the callback function is executed.

```js
$('form').validateWrapper({
	destroyOnCallback    : true
});
```

1.  Adding additional methods from jquery validate.

```js
	//function name can be anything.
	function additionalMethods(){
			//adding color to the filled element in the form
			$( "input:filled, textarea:filled, select:filled" ).css( "background-color", "#bbbbff");
			
			//adding color to the blank element in the form
			$( "input:blank, textarea:blank, select:blank" ).css( "background-color", "#D3D3D3" );

			//Additional Function
			jQuery.validator.addMethod("valid_email", function (value, element) {
			//Your logic comes here.
			});

			//Setting form validation on non submit button
			$( 'button[type="button"]' ).click(function() {
				var form = $('form');
				if(form.valid()) {
					//callback function
				}
			});
		}
```
Setting form validation on normal button the just add onClick event handler to the button and call valid() method on form.

Note: All the function in the additionalMethods are of jquery validate plugin.

* Adding and modifying validator messages.

```js
$('form').validateWrapper({
	messages: {
		required	: "Please don't keep the field empty.", //modifying the message.
    	valid_email : "Please enter valid email."  //adding new validator Message for custom validation method.
  	},
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
		g_name_group: "first_name last_name" //nameGroup is a groupName
	}
});
```
2. Set the "groupName" as the class name for the fields. And add `group-in-one` class for the field to setup message.

```html
<input type="text" class="form-control g_name_group group-in-one" id="first_name" name="first_name" required="true" />g_name_groupg_name_groupg_name_group
<input type="text" class="form-control g_name_group group-in-one" id="last_name" name="last_name" required="true" />
```

3. To set message for the group.

```js
$('form').validateWrapper({
	messages: {
		g_name_group: "Group message"
	}
});
```

Note: group name has to be unique so we follow a convention to setup groups. So the group name will start with a 'g_' followed by group_name.

* Adding `require_from_group` validation and a custom message for it.
`require_from_group` ensures a given number of fields in a group are complete.
1. You just have to add class `require_from_group` to trigger require_from_group rule for the element. And add a `group_class` for setup message.

```html
<!-- 
rfg_dob_group is a group class for these fields. you can have multiple group_classes.
-->
<select class="form-control rfg_dob_group require_from_group" name="day" >
	<option value="">--Please Select--</option>
</select>
<select class="form-control rfg_dob_group require_from_group" name="month" >
	<option value="">--Please Select--</option>
</select>
<select class="form-control rfg_dob_group require_from_group" name="year" >
	<option value="">--Please Select--</option>
</select>
```

2. Define number of fields to validate.
   
```js
$('form').validateWrapper({
	require_from_group:{
		rfg_dob_group : 2,
	},
});
```

3. To set message for the group.

```js
$('form').validateWrapper({
	messages: {
		rfg_dob_group: "Required from group message"
	}
});
```

Note: group name has to be unique so we follow a convention to setup require_from_group rule. So the group name will start with a 'rfg_' followed by group_name.
   
## Demo URL's
*   [Demo with Default Parameters](https://sid04naik.github.io/jquery.validate-wrapper/demo/default-demo.html)
*   [Demo with all valid Parameters](https://sid04naik.github.io/jquery.validate-wrapper/demo/demo-with-params.html)

## LICENSE

[MIT License](https://github.com/sid04naik/jquery.validate-wrapper/blob/master/LICENSE)

Copyright (c) 2019 Siddhant Naik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

