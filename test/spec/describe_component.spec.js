/*global describeComponent, setupComponent, chai*/

define(function (require) {
  'use strict';

  var expect = chai.expect;
  var defineComponent = require('flight/lib/component');
  var Example = require('mock/example');

  describeComponent('mock/example', function () {
    describe('this.Component', function () {
      it('should be an Example component', function () {
        expect(this.Component).to.equal(Example);
      });
    });

    describe('this.component', function () {
      it('should be null if setupComponent() isn\'t called', function () {
        expect(this.component).to.equal(null);
      });

      it('should be an instance of Example, if setupComponent() is called', function (done) {
        setupComponent();
        expect(this.component).to.be.an.instanceof(Example);
        done();
      });

      it('should reset `this.component` in a new context', function () {
        expect(this.component).to.equal(null);
      });
    });

    describe('defineComponent.teardownAll()', function () {
      before(function () {
        sinon.spy(defineComponent, 'teardownAll');
      });

      after(function () {
        defineComponent.teardownAll.restore();
      });

      describe('automatically calls after each test', function () {
        it('dummy', function () {
          // do nothing
        });

        it('first call', function () {
          expect(defineComponent.teardownAll.callCount).to.equal(1);
        });

        it('second call', function () {
          expect(defineComponent.teardownAll.callCount).to.equal(2);
        });

        it('third call', function () {
          expect(defineComponent.teardownAll.callCount).to.equal(3);
        });
      });
    });

    describe('this.component.teardown()', function () {
      it('prepare', function () {
        sinon.spy(this.Component.prototype, 'teardown');
      });

      it('should automatically call before setupComponent() if component is exists', function () {
        expect(this.component).to.equal(null);
        setupComponent();
        expect(this.component.teardown.callCount).to.equal(0);
        setupComponent();
        expect(this.component.teardown.callCount).to.equal(1);
      });

      it('should be called by afterEach of before `it`', function () {
        expect(this.Component.prototype.teardown.callCount).to.equal(2);
      });

      it('restore', function () {
        this.Component.prototype.teardown.restore();
      });
    });

    describe('setupComponent()', function () {
      it('provides the correct $node attribute', function () {
        expect(this.$node).to.equal(null);
        setupComponent();
        expect(this.$node).to.be.an.instanceOf(jQuery);
        expect($('<div/>').append(this.$node).html()).to.equal('<div class="component-root"></div>');
      });

      it('should set fixture if string given to first argument', function () {
        setupComponent('<div id="test_fixture1"/>');
        expect($('<div/>').append(this.$node).html()).to.equal(
          '<div class="component-root">' +
            '<div id="test_fixture1"></div>' +
          '</div>'
        );
      });

      it('should set fixture if jQuery object given to first argument', function () {
        setupComponent($('<div id="test_fixture2"/>'));
        expect($('<div/>').append(this.$node).html()).to.equal(
          '<div class="component-root">' +
            '<div id="test_fixture2"></div>' +
          '</div>'
        );
      });

      it('should remove $node by afterEach', function () {
        expect(this.$node).to.equal(null);
        expect($('.component-root').length).to.equal(0);
      });

      it('should passed options to component if object givent to first argument', function () {
        setupComponent();
        expect(this.component.attr.param).to.equal('defaultParam');
        setupComponent({
          param: 'testParam'
        });
        expect(this.component.attr.param).to.equal('testParam');
      });

      it('should set fixture and passed options to component if both arguments given', function () {
        setupComponent('<div id="test_fixture_both"/>', {
          param: 'testFixtureParam'
        });
        expect(this.component.attr.param).to.equal('testFixtureParam');
        expect($('<div/>').append(this.$node).html()).to.equal(
          '<div class="component-root">' +
            '<div id="test_fixture_both"></div>' +
          '</div>'
        );
      });

      it('should reset a fixture if multiple calls', function () {
        setupComponent('<div id="fixture1"/>');
        expect($('<div/>').append(this.$node).html()).to.equal(
          '<div class="component-root">' +
            '<div id="fixture1"></div>' +
          '</div>'
        );
        setupComponent('<div id="fixture2"/>');
        expect($('<div/>').append(this.$node).html()).to.equal(
          '<div class="component-root">' +
            '<div id="fixture2"></div>' +
          '</div>'
        );
      });

      it('should calls this.component.teardown() if multiple calls', function () {
        sinon.spy(this.Component.prototype, 'teardown');
        try {
          setupComponent();
          expect(this.component.teardown.callCount).to.equal(0);
          setupComponent();
          expect(this.component.teardown.callCount).to.equal(1);
        } finally {
          this.Component.prototype.teardown.restore();
        }
      });
    });
  });
});
