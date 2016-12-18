// This conf file was heavily based on vue's:
// https://github.com/vuejs/vue/blob/dev/build/karma.sauce.config.js

var baseConf = require('./karma.base.conf')
require('dotenv').config()

var batches = [
  // the cool kids
  {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    sl_mac_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10'
    }
  },
  // ie family
  {
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  },
  // mobile
  {
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone'
    },
    sl_android: {
      base: 'SauceLabs',
      browserName: 'android'
    }
  }
]

module.exports = function (config) {
  var customLaunchers = batches[process.argv[4] || 0]

  config.set(Object.assign(baseConf(config), {
    sauceLabs: {
      testName: 'jQuery Clickout Tests',
      build: process.env.TRAVIS_BUILD_ID || 'jquery-clickout-tests-' + Date.now()
    },

    customLaunchers: customLaunchers,

    browsers: Object.keys(customLaunchers),

    singleRun: true,

    reporters: ['dots', 'saucelabs'],

    // mobile emulators are really slow
    captureTimeout: 300000,
    browserNoActivityTimeout: 300000
  }))
}
