/**
 * jQuery Clickout Plugin
 * @version 0.0.3
 * @author Guilherme Santiago - github.com/gsantiago
 */

var $ = require('jquery')
var $document = $(document)
var hash = {}
var setup = false

$.event.special.clickout = {
  setup: function (data, namespaces, eventHandle) {
    if (setup) return

    $document.on('click.clickout-handler', function (event) {
      $.each(hash, function (index, obj) {
        var condition = true

        $.each(obj.elements, function (i, el) {
          if ($(event.target).closest(el).length) condition = false
        })

        if (condition) {
          obj.handler.call($(obj.elements), event)
        }
      })
    })

    setup = true
  },

  teardown: function () {
    if (hash) return
    $document.off('click.clickout-handler')
    setup = false
  },

  add: function (handleObj) {
    var guid = handleObj.guid
    if (!hash.hasOwnProperty(guid)) {
      hash[guid] = {elements: [this], handler: handleObj.handler}
    } else {
      hash[guid].elements.push(this)
    }
  },

  remove: function (handleObj) {
    delete hash[handleObj.guid]
  }
}
