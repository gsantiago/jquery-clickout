/**
 * Dependencies.
 */

var $ = require('jquery')
require('../src/jquery-clickout')

describe('jQuery Clickout', function () {
  it('should add `clickout` special event', function () {
    expect($.event.special.clickout).not.toBeNull()
  })

  it('should listen to `clickout` event', function () {

    var $button = $('<button>').appendTo('body')
    var $span = $('<span>').appendTo('body')

    var buttonSpy = jasmine.createSpy()
    var spanSpy = jasmine.createSpy()
    var clickoutSpy = jasmine.createSpy()

    $button.on('clickout', function (e) {
      clickoutSpy()
    })

    $button.on('click', function (e) {
      buttonSpy()
    })

    $span.on('click', function (e) {
      spanSpy()
    })

    $span.click().click()
    $('body').click()
    $button.click().click().click()

    expect(spanSpy.calls.count()).toEqual(2)
    expect(clickoutSpy.calls.count()).toEqual(3)
    expect(buttonSpy.calls.count()).toEqual(3)

    $button.off('clickout')

    $span.click()
    $button.click()

    expect(spanSpy.calls.count()).toEqual(3)
    expect(clickoutSpy.calls.count()).toEqual(3)
    expect(buttonSpy.calls.count()).toEqual(4)
  })

  it('should support multiple elements', function () {
    var buttonSpy = jasmine.createSpy()
    var popupSpy = jasmine.createSpy()
    var spanSpy = jasmine.createSpy()
    var clickoutSpy = jasmine.createSpy()

    var $btn = $('<button>').appendTo('body')
    var $popup = $('<ul>').appendTo('body')
    var $span = $('<span>').appendTo('body')

    $btn.add($popup).on('clickout', function () {
      expect(this.filter('button').is($btn[0])).toBeTruthy()
      expect(this.filter('ul').is($popup[0])).toBeTruthy()
      clickoutSpy()
    })

    $btn.on('click', function () {
      buttonSpy()
    })

    $popup.on('click', function () {
      popupSpy()
    })

    $span.on('click', function () {
      spanSpy()
    })


    $popup.click()
    $btn.click()
    $span.click()
    $('body').click()

    expect(popupSpy.calls.count()).toEqual(1)
    expect(buttonSpy.calls.count()).toEqual(1)
    expect(clickoutSpy.calls.count()).toEqual(2)
    expect(spanSpy.calls.count()).toEqual(1)
  })

  it('should support different elements', function () {
    var $button = $('<button>').appendTo('body')
    var $link = $('<a href="#">').appendTo('body')

    var buttonClickoutSpy = jasmine.createSpy()
    var linkClickoutSpy = jasmine.createSpy()

    $button.on('clickout', function (e) {
      expect(e.target).toEqual($link[0])
      buttonClickoutSpy()
    })

    $link.on('clickout', function (e) {
      expect(e.target).toEqual($button[0])
      linkClickoutSpy()
    })

    $button.click()
    expect(buttonClickoutSpy.calls.count()).toEqual(0)
    expect(linkClickoutSpy.calls.count()).toEqual(1)

    $link.click()
    expect(buttonClickoutSpy.calls.count()).toEqual(1)
    expect(linkClickoutSpy.calls.count()).toEqual(1)

    $link.click()
    expect(buttonClickoutSpy.calls.count()).toEqual(2)
    expect(linkClickoutSpy.calls.count()).toEqual(1)
  })
})
