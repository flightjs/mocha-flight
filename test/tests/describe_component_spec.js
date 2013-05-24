/*global describeComponent, setupComponent*/
'use strict';

define(function() {
  describeComponent('app/data/example', function() {
    describe("this.Component", function() {
      it("should be Example component", function(done) {
        require(['app/data/example'], function(Example) {
          expect(this.Component).to.be(Example);
          done();
        }.bind(this));
      });
    });

    describe("this.component", function() {
      it("should be null if setupComponent() isn't called", function() {
        expect(this.component).to.be(null);
      });

      it("should be instance of Example if setupComponent() is called", function(done) {
        setupComponent();
        require(['app/data/example'], function(Example) {
          expect(this.component).to.be.an(Example);
          done();
        }.bind(this));
      });

      it("should reset the this.component if new context", function() {
        expect(this.component).to.be(null);
      });
    });

    describe("defineComponent.teardownAll()", function() {
      before(function() {
        require(['flight/lib/component'], function(defineComponent) {
          sinon.spy(defineComponent, 'teardownAll');
        });
      });

      after(function() {
        require(['flight/lib/component'], function(defineComponent) {
          defineComponent.teardownAll.restore();
        });
      });

      describe("automatically call after each tests", function() {
        it("dummy", function() {
          // do nothing
        });

        it("first call", function(done) {
          require(['flight/lib/component'], function(defineComponent) {
            expect(defineComponent.teardownAll.callCount).to.be(1);
            done();
          });
        });

        it("second call", function(done) {
          require(['flight/lib/component'], function(defineComponent) {
            expect(defineComponent.teardownAll.callCount).to.be(2);
            done();
          });
        });

        it("third call", function(done) {
          require(['flight/lib/component'], function(defineComponent) {
            expect(defineComponent.teardownAll.callCount).to.be(3);
            done();
          });
        });
      });
    });

    describe("this.component.teardown()", function() {
      it("prepare", function() {
        sinon.spy(this.Component.prototype, 'teardown');
      });

      it("should automatically call before setupComponent() if component is exists", function() {
        expect(this.component).to.be(null);
        setupComponent();
        expect(this.component.teardown.callCount).to.be(0);
        setupComponent();
        expect(this.component.teardown.callCount).to.be(1);
      });

      it("should be called by afterEach of before `it`", function() {
        expect(this.Component.prototype.teardown.callCount).to.be(2);
      });

      it("restore", function() {
        this.Component.prototype.teardown.restore();
      });
    });

    describe("setupComponent()", function() {
      it("should provides $node attribute", function() {
        expect(this.$node).to.be(null);
        setupComponent();
        expect(this.$node).to.be.a(jQuery);
        expect($('<div/>').append(this.$node).html()).to.be('<div class="component-root"></div>');
      });

      it("should set fixture if string given to first argument", function() {
        setupComponent('<div id="test_fixture1"/>');
        expect($('<div/>').append(this.$node).html()).to.be(
          '<div class="component-root">' +
            '<div id="test_fixture1"></div>' +
          '</div>'
        );
      });

      it("should set fixture if jQuery object given to first argument", function() {
        setupComponent($('<div id="test_fixture2"/>'));
        expect($('<div/>').append(this.$node).html()).to.be(
          '<div class="component-root">' +
            '<div id="test_fixture2"></div>' +
          '</div>'
        );
      });

      it("should remove $node by afterEach", function() {
        expect(this.$node).to.be(null);
        expect($('.component.root').length).to.be(0);
      });

      it("should passed options to component if object givent to first argument", function() {
        setupComponent();
        expect(this.component.attr.param).to.be('defaultParam');
        setupComponent({
          param: 'testParam'
        });
        expect(this.component.attr.param).to.be('testParam');
      });

      it("should set fixture and passed options to component if both arguments given", function() {
        setupComponent('<div id="test_fixture_both"/>', {
          param: 'testFixtureParam'
        });
        expect(this.component.attr.param).to.be('testFixtureParam');
        expect($('<div/>').append(this.$node).html()).to.be(
          '<div class="component-root">' +
            '<div id="test_fixture_both"></div>' +
          '</div>'
        );
      });

      it("should reset a fixture if multiple calls", function() {
        setupComponent('<div id="fixture1"/>');
        expect($('<div/>').append(this.$node).html()).to.be(
          '<div class="component-root">' +
            '<div id="fixture1"></div>' +
          '</div>'
        );
        setupComponent('<div id="fixture2"/>');
        expect($('<div/>').append(this.$node).html()).to.be(
          '<div class="component-root">' +
            '<div id="fixture2"></div>' +
          '</div>'
        );
      });

      it("should calls this.component.teardown() if multiple calls", function() {
        sinon.spy(this.Component.prototype, 'teardown');
        try {
          setupComponent();
          expect(this.component.teardown.callCount).to.be(0);
          setupComponent();
          expect(this.component.teardown.callCount).to.be(1);
        } finally {
          this.Component.prototype.teardown.restore();
        }
      });
    });
  });
});
