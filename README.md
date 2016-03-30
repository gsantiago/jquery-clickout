# jQuery Clickout

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

jQuery plugin for handle outside clicks. It doesn't stop event propagation
nor prevents default events.

It extends the jQuery Events and adds a new custom event: `clickout`.

You can use it normally with `on` and `off` methods:

```js
// Add a clickout listener
$('button').on('clickout', function (e) {
  console.log('click outside button')
})

// Remove a clickout listener
$('button').off('clickout')
```

The coolest feature is the multiple elements support:

```js
$('.js-button, .js-menu').on('clickout', function (e) {
  console.log('click outside `js-button` and `js-menu`')
  this.addClass('is-hidden') // now both $button and $menu have `is-hidden` class
})


$button.add($menu).on('clickout', function () {
  console.log('click outside `js-button` and `js-menu`')
  this.addClass('is-hidden') // now both $button and $menu have `is-hidden` class
})
```

## Installation

```npm install jquery-clickout --save```

Or just copy `jquery-clickout.min.js` from this repository, in the `dist`
folder.

## Usage

Just use `clickout` like a normal event. Very very easy:

```javascript
$('.my-element').on('clickout', function (e) {
  console.log('Outside element click')
  console.log(this) // jQuery instance of `.my-element`
})
```