'use strict';

mocha.setup('mocha-flight');

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    'es5-shim': 'bower_components/es5-shim/es5-shim',
    'es5-sham': 'bower_components/es5-shim/es5-sham',
    'jquery': 'bower_components/jquery/dist/jquery',
    'flight': 'bower_components/flight',
    'chai': 'bower_components/chai/chai',
    'mock': 'test/mock'
  },

  // ask Require.js to load these files (all dependent libs and our tests)
  deps: (function () {
    var libs = ['es5-shim', 'es5-sham', 'jquery'],
      tests = Object.keys(window.__karma__.files).filter(function (file) {
        return (/\.spec\.js$/.test(file));
      });

    return Array.prototype.concat(libs, tests);
  }()),

  // start test run, once Require.js is done
  callback: window.__karma__.start
});

