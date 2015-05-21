/*global describeComponent, setupComponent*/

define(function (require) {
  'use strict';

  var expect = require('chai').expect;
  var defineComponent = require('flight/lib/component');
  var Example = require('mock/example');
  var OtherExample = require('mock/other-example');

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
        expect(this.$node.hasClass('component-root')).to.equal(true);
        expect(this.$node.attr('id')).to.equal('test_fixture1');
      });

      it('should set fixture if jQuery object given to first argument', function () {
        setupComponent($('<div id="test_fixture2"/>'));
        expect(this.$node.hasClass('component-root')).to.equal(true);
        expect(this.$node.attr('id')).to.equal('test_fixture2');
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
        expect(this.$node.hasClass('component-root')).to.be.true;
        expect(this.$node.attr('id')).to.equal('test_fixture_both');
      });

      it('should reset a fixture if multiple calls', function () {
        setupComponent('<div id="fixture1"/>');
        expect(this.$node.hasClass('component-root')).to.be.true;
        expect(this.$node.attr('id')).to.equal('fixture1');

        setupComponent('<div id="fixture2"/>');
        expect(this.$node.hasClass('component-root')).to.be.true;
        expect(this.$node.attr('id')).to.equal('fixture2');
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

  describeComponent('mock/other-example', function () {
    it('should support test suites for different components', function () {
      setupComponent();
      expect(this.Component).to.equal(OtherExample);
      expect(this.component.attr.param).to.equal('otherParam');
    });
  });

  describeComponent('mock/example', function () {
    it('should support multiple test suites on the same component', function () {
      setupComponent();
      expect(this.Component).to.equal(Example);
      expect(this.component).to.be.an.instanceof(Example);
    });
  });
});
