define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  function Example() {
    this.attributes({
      param: 'defaultParam'
    });

    this.doing = function() {
        console.log('this.doing');
        // Do nothing
    };

    this.after('initialize', function() {
        this.on('SomeEvent', this.doing);
    });
  }

  return defineComponent(Example);
});
