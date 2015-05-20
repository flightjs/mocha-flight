define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  function OtherExample() {
    this.attributes({
      param: 'otherParam'
    });
  }

  return defineComponent(OtherExample);
});
