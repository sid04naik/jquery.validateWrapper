# jquery.vallidate-wrapper

This wrapper plugin will run above the **JQuery Validation Plugin**.

Basically, the wrapper plugin will help you to validate form elements with adding much line of a code. Just use the form selector and call the wrapper plugin and the form will start validating. 
This will help the developers to maintain a single file for all the form. It will also help the developers in terms of code redundancy, latency, and many other aspects.

Below is the documentation please follow then to get started with Jquery.validate-wrapper.

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
  1.   Setting ignore value.
  ```js
  $('form').validateWrapper({
    ignore  : ":hidden:not(.hidden-required)",
  });
  ```
  2.    Setting error class.
  ```js
  $('form').validateWrapper({
    errorClass       : 'error-fld',
  });
  ```
  3.    Setting error element.
  ```js
  $('form').validateWrapper({
    errorElement     : 'p',
  });
  ```
  4.    Setting valid class.
    ```js
  $('form').validateWrapper({
    validClass       : 'valid-fld',
  });
  ```
  5.    Setting focus invalid.
   ```js
  $('form').validateWrapper({
    focusInvalid     : false,
  });
  ```


---
layout: default
---

Text can be **bold**, _italic_, or ~~strikethrough~~.

[Link to another page](./another-page.html).

There should be whitespace between paragraphs.

There should be whitespace between paragraphs. We recommend including a README, or a file with information about your project.

# Header 1

This is a normal paragraph following a header. GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

## Header 2

> This is a blockquote following a header.
>
> When something is important enough, you do it even if the odds are not in your favor.

### Header 3

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

#### Header 4

*   This is an unordered list following a header.
*   This is an unordered list following a header.
*   This is an unordered list following a header.

##### Header 5

1.  This is an ordered list following a header.
2.  This is an ordered list following a header.
3.  This is an ordered list following a header.

###### Header 6

| head1        | head two          | three |
|:-------------|:------------------|:------|
| ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  |

### There's a horizontal rule below this.

* * *

### Here is an unordered list:

*   Item foo
*   Item bar
*   Item baz
*   Item zip

### And an ordered list:

1.  Item one
1.  Item two
1.  Item three
1.  Item four

### And a nested list:

- level 1 item
  - level 2 item
  - level 2 item
    - level 3 item
    - level 3 item
- level 1 item
  - level 2 item
  - level 2 item
  - level 2 item
- level 1 item
  - level 2 item
  - level 2 item
- level 1 item

### Small image

![Octocat](https://github.githubassets.com/images/icons/emoji/octocat.png)

### Large image

![Branching](https://guides.github.com/activities/hello-world/branching.png)


### Definition lists can be used with HTML syntax.

<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl>

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```
The final element.
```

