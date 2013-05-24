'use strict';

define([
  'flight/lib/component'
], function(defineComponent) {
  function Example() {
    this.defaultAttrs({
      param: 'defaultParam'
    });
  }

  return defineComponent(Example);
});
