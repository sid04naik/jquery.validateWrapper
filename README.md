# jquery.validateWrapper v1.19.1 [![CodeFactor](https://www.codefactor.io/repository/github/sid04naik/jquery.validatewrapper/badge)](https://www.codefactor.io/repository/github/sid04naik/jquery.validatewrapper) [![Build Status](https://travis-ci.com/sid04naik/jquery.validateWrapper.svg?branch=master)](https://travis-ci.com/sid04naik/jquery.validateWrapper)

This validateWrapper plugin will run above the **[JQuery Validate Plugin](https://jqueryvalidation.org/)**.

Basically, the validateWrapper plugin will help you to validate form elements by adding a few lines of code. Just use the form selector and call the validateWrapper plugin and the form will start validating.
This will help the developers to maintain a single file for all the form. It will also help the developers in terms of code redundancy, latency, and many other aspects.

Below is the documentation please follow them to get started with Jquery.validateWrapper.

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

* Form tag is required for form elements to validate.

```html
<form action="#" name="demoForm" method="POST" novalidate="novalidate" onsubmit="return false;">
```

Note: `name` , `novalidate` and `onsubmit` attributes are compulsory.


## [Documentation](https://sid04naik.github.io/jquery.validateWrapper/)

* Download jquery.validateWrapper Plugin by clicking on [Download Plugin](https://github.com/sid04naik/jquery.validateWrapper/releases/tag/v1.19.1).
* Load the jquery.validateWrapper.

### CDN
- [https://d37xf8bn4ru1eg.cloudfront.net/jquery-validateWrapper/v1.19.1/jquery.validateWrapper.min.js](https://d37xf8bn4ru1eg.cloudfront.net/jquery-validateWrapper/v1.19.1/jquery.validateWrapper.min.js)
- [https://d37xf8bn4ru1eg.cloudfront.net/jquery-validateWrapper/v1.19.1/jquery.validateWrapper.js](https://d37xf8bn4ru1eg.cloudfront.net/jquery-validateWrapper/v1.19.1/jquery.validateWrapper.js)

```js
<script src="https://d37xf8bn4ru1eg.cloudfront.net/jquery-validateWrapper/v1.19.1/jquery.validateWrapper.min.js"> </script> //minified
<script src="https://d37xf8bn4ru1eg.cloudfront.net/jquery-validateWrapper/v1.19.1/jquery.validateWrapper.js"> </script> //non minified
```
* Initializing the plugin with the default Settings.

```js
$('form').validateWrapper(); //Selector should be always reference to a form element.
```
This will validate the form elements with default values.

* Changing default options with user-defined options.
List of options which the user can define.

* `ignore`.
Any field you don't want to validate you can add those here.

```js
$('form').validateWrapper({
    ignore  : ":hidden:not(.hidden-required)",
});
```

* `errorClass`.
You can set your own error class with your own styling.

```js
$('form').validateWrapper({
    errorClass  : 'error-fld',
});
```

* `errorElement`.
You can have your own element where you can show the error messages.

```js
$('form').validateWrapper({
    errorElement  : 'p',
});
```

* `validClass`.
You can set your own valid class with your own styling.

```js
$('form').validateWrapper({
    validClass  : 'valid-fld',
});
```

* `highlight`.
If you want to highlight any element when the field is validated, then you can add that logic here.
```js
$('form').validateWrapper({
    highlight : function (element, errorClass, validClass) {
    //Your logic comes here.
    },
});
```

* `unhighlight`.
If you want to unhighlight any element when the field is validation is successful, then you can add that logic here.

```js
$('form').validateWrapper({
    unhighlight : function (element, errorClass, validClass) {
        //Your logic comes here.
      },
});
```

* `invalidHandler`.
Invalid field handling is done here.

```js
$('form').validateWrapper({
    invalidHandler  : function (form, validator) {
        //Your logic comes here.
      },
});
```

* `errorPlacement`.
If you want to place the error as per your convenience then you can write the logic here.

```js
$('form').validateWrapper({
    errorPlacement  : function (error, element) {
        //Your logic comes here.
      },
});
```

* `normalizer`
You can normalize the value before submitting the form.

```js
$('form').validateWrapper({
    normalizer  : function (value) {
    //Your logic comes here.
    },
});
```

* `validateOnLoad`
If you want to validate the form on load then you need to set it as `true`.

```js
$('form').validateWrapper({
    validateOnLoad    : true
});
```

* `validateOnClick`.
If you want to validate the form on click of an element then you need to set it as `true` and add class `_validate_oc` to the element on which you want to trigger validation.

```js
$('form').validateWrapper({
    validateOnClick    : true
});
```
```html
<button type="button" name="Button" class="btn btn-primary _validate_oc">Button</button>
```

* `validateOnKeyPress`.
If you want to validate the form on keypress of an element then you need to set it as `true` and add class `_validate_kp` to the element on which you want to trigger validation.

```js
$('form').validateWrapper({
    validateOnKeyPress    : true
});
```
```html
<input type="email" class="form-control _validate_kp" id="email" name="email"  />
```

*  `resetValidator`
if you want to reset the form validation, then you need to set it as `true`. Also `resetValidator` will work only on button type `reset` and button type `button` and the button should have a class called `_reset_validator`.

```js
$('form').validateWrapper({
    resetValidator    : true
});
```
```html
<button type="reset" name="reset" class="btn btn-primary _reset_validator">Reset Button</button>
<button type="button" name="button" class="btn btn-primary _reset_validator">Button</button>
```

* `destroyOnCallback`
If you want to destroy the Validator once the callback function is executed, then you need to set it as `true`.

```js
$('form').validateWrapper({
    destroyOnCallback    : true
});
```

*  `addToValidator`
If you want to add any other validation functions which are not present in the wrapper or you want to set your own validation functions, then you have to create a method and add the method to `addToValidator`.

```js
$('form').validateWrapper({
    addToValidator  : function (form,validator) {
        additionalMethods(form,validator);
    },
});

//function name can be anything.
function additionalMethods(form,validator){
    //adding color to the filled element in the form
    $( "input:filled, textarea:filled, select:filled" ).css( "background-color", "#bbbbff");
}
```

*  `onComplete`
Anything you want to execute once the submitHandler is called, then you can have it here. `onComplete` is a callback function called in SubmitHandler.

```js
$('form').validateWrapper({
    onComplete  : function (form,event) {
    //Your logic comes here.
    },
});
```

*  `messages`
If you want to add new error messages or modify the existing messages then it has to be set here.

```js
$('form').validateWrapper({
    messages: {
        required    : "Please don't keep the field empty.", //modifying the message.
        valid_email : "Please enter valid email."  //adding new validator Message for custom validation method.
      },
});
```

*  `groups`
If you want to have a group validation then it can be done using `groups`. Please follow the steps to set up group validation.

Step 1: Create a groupName in `groups` and add the fields you want to group together against the groupName.

```js
$('form').validateWrapper({
    groups: {
        g_name_group: "first_name last_name" //g_name_group is a groupName
    }
});
```

Step 2: Set the groupName as a class into the fields which are grouped together.

```html
<input type="text" class="form-control g_name_group " id="first_name" name="first_name" required="true" />

<input type="text" class="form-control g_name_group " id="last_name" name="last_name" required="true" />
```

Step 3: Add class `group-in-one` to all the elements which are grouped together.

```html
<input type="text" class="form-control g_name_group group-in-one" id="first_name" name="first_name" required="true" />

<input type="text" class="form-control g_name_group group-in-one" id="last_name" name="last_name" required="true" />
```

Step 4: Adding custom messages to each group.

```js
$('form').validateWrapper({
    messages: {
        g_name_group: "Group message"
    }
});
```

Note: You can have multiple groups with unique groupName. So to keep them unique so we follow a convention to set up groups. So the group name will start with a 'g_' followed by group_name.

*  `require_from_group`
Sometimes you need to validate only a few fields from the group then you can use `require_from_group` option to do that. `require_from_group` ensures a given number of fields in a group are complete.
To set up `require_from_group` validation you have to follow below steps.

Step 1:  Add class `require_from_group` to all the elements on which you want to perform `require_from_group` rules.

```html
<select class="form-control require_from_group" name="day" >
    <option value="">--Please Select--</option>
</select>
<select class="form-control require_from_group" name="month" >
    <option value="">--Please Select--</option>
</select>
<select class="form-control require_from_group" name="year" >
    <option value="">--Please Select--</option>
</select>
```

Step 2: Create a groupName in `require_from_group` and add the number of fields you want to validate from the group.

```js
$('form').validateWrapper({
    require_from_group:{
        rfg_dob_group : 2,
    },
});
```

Step 3: The groupName which is created above, add that groupName as a class for the elements. This will identify each group uniquely.

```html
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

Step 4: Adding custom messages to each group.

```js
$('form').validateWrapper({
    messages: {
        rfg_dob_group: "Group message"
    }
});
```

Note: group name has to be unique so we follow a convention to setup require_from_group rule. So the group name will start with an 'rfg_' followed by group_name.

*  `showErrors`
Show Errors will add the message to the element programmatically.

```js
$('form').validateWrapper({
    showErrors: {
        "first_name": "First Name should be written in 'Pete Pete' format."
    }
});
```

* Included additional validation methods.
- `age`
Age validation is added in this validateWrapper plugin. This will allow the user to enter only numbers and the number cannot be greater than 3 digits.

```html
<input type="number" class="form-control" id="age" name="age" age="true" />
```

- `ckeditor_required`
To validate ckeditor using Jquery validator it is not straight forward. You have to do some settings to validate ckeditor. This wrapper will skip that step for you and allow you to validate ckeditor by just adding an attribute ckeditor_required as true.

```html
<textarea name="content" ck-editor="true" id="content" ckeditor_required="true" ></textarea>
```

* `hide-validation-message`
If you don't want to display the error message when the field is validated then you can use `hide-validation-message = true` as an attribute for the element.

```html
<input type="text" class="form-control" hide-validation-message=true id="username" name="username" required="true" />
```

* `append-msg-to-parent`
By default, the error message will be appended to the element. But in certain case you want the error message to be appended to its parent element, then you can set `append-msg-to-parent` as an attribute to the element and set the value to `true`.

```html
<input type="text" class="form-control" append-msg-to-parent=true id="username" name="username" required="true" />
```

* Setting other jQuery Validator options.
You can set all the jQuery Validator options in the validateWrapper plugin.

## Demo URL's
*   [Demo with Default Parameters](https://sid04naik.github.io/jquery.validateWrapper/demo/default-demo.html)
*   [Demo with all valid Parameters](https://sid04naik.github.io/jquery.validateWrapper/demo/demo-with-params.html)

## LICENSE

[MIT License](https://github.com/sid04naik/jquery.validateWrapper/blob/master/LICENSE)

Copyright (c) 2019 Siddhant Naik
