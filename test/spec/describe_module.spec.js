/*global describeModule*/

define(function (require) {
  'use strict';

  var expect = require('chai').expect;
  var Module = require('mock/example-module');

  describeModule('mock/example-module', function() {
    describe('this.module', function() {
      it('should equal the example module', function() {
        expect(this.module).to.equal(Module);
      });
    });

    describe('this.module.*', function() {
      it('should allow property access', function() {
        expect(this.module.baz).to.equal('quux');
      });

      it('should allow method calls', function() {
        expect(this.module.foo()).to.equal('bar');
      });
    });
  });
});
