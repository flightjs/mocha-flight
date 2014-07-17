'use strict';

mocha.setup('mocha-flight');

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    'jquery': 'bower_components/jquery/dist/jquery',
    'flight': 'bower_components/flight',
    'chai': 'bower_components/chai/chai',
    'mock': 'test/mock'
  },

  // ask Require.js to load these files (all dependent libs and our tests)
  deps: (function () {
    var libs = ['jquery'],
      tests = Object.keys(window.__karma__.files).filter(function (file) {
        return (/\.spec\.js$/.test(file));
      });

    return Array.prototype.concat(libs, tests);
  }()),

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
