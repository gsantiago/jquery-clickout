# jQuery Clickout

[![Build Status](https://travis-ci.org/gsantiago/jquery-clickout.svg?branch=master)](https://travis-ci.org/gsantiago/jquery-clickout)
[![Build Status](https://saucelabs.com/buildstatus/jquery_clickout)](https://saucelabs.com/beta/builds/5bf8eeee1e7b4f72b620ad07484e82b9)
[![npm version](https://badge.fury.io/js/jquery-clickout.svg)](https://badge.fury.io/js/jquery-clickout)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Code Climate](https://codeclimate.com/github/gsantiago/jquery-clickout/badges/gpa.svg)](https://codeclimate.com/github/gsantiago/jquery-clickout)

<p align="center">
  <a href="https://saucelabs.com/u/jquery_clickout">
    <img src="https://saucelabs.com/browser-matrix/jquery_clickout.svg" alt="Sauce Test Status">
  </a>
</p>

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
