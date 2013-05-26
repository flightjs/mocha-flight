# flight-mocha [![Build Status](https://travis-ci.org/naoina/flight-mocha.png?branch=master)](https://travis-ci.org/naoina/flight-mocha)

Extensions to the Mocha test framework for use with [Flight](https://github.com/twitter/flight)

flight-mocha is based on [flight-jasmine](https://github.com/twitter/flight-jasmine)
but assertion and Test Double libraries aren't included.

## Installation

Recommend using [Bower](https://github.com/twitter/bower)

```bash
% bower install --save-dev flight-mocha
```

flight-mocha depends on [mocha](https://github.com/visionmedia/mocha)

## Usage

In this examples, assertion library uses the [expect.js](https://github.com/LearnBoost/expect.js)

### Components

```javascript
describeComponent('path/to/component', function() {
  beforeEach(function() {
    setupComponent();
  });

  it("should do x", function() {
    // a component instance is now accessible as this.component
    // the component root node is attached to the DOM
    // the component root node is also available as this.$node
  });
});
```

### Mixins

```javascript
describeMixin('path/to/mixin', function() {
  // initialize the component and attach it to the DOM
  beforeEach(function() {
    setupComponent();
  });

  it("should do x", function() {
    expect(this.component.doSomething()).to.be(expected);
  });
});
```

### Event spy

Please use the [sinon.js](https://github.com/cjohansen/Sinon.JS) or other similar library.

### setupComponent

```javascript
setupComponent(optionalFixture, optionalOptions);
```

Calling `setupComponent` twice will create an instance, tear it down and create a new one.

#### HTML Fixtures

```javascript
describeComponent('ui/twitter_profile', function() {
  // is the component attached to the fixture?
  it("this.component.$node has class 'foo'", function() {
    setupComponent('<span class="foo">Test</span>');
    expect(this.component.$node.find('span').hasClass('foo')).to.be.ok();
  });
});
```

#### Component Options

```javascript
describeComponent('data/twitter_profile', function() {
  // is the option set correctly?
  it("this.component.attr.baseUrl is set", function() {
    setupComponent({
      baseUrl: 'http://twitter.com/1.1/'
    });
    expect(this.component.attr.baseUrl).to.be('http://twitter.com/1.1/');
  });
});
```

## Teardown

Components are automatically torn down after each test.

## License

Copyright (c) 2013 Naoya Inada <naoina@kuune.org>

Licensed under the MIT License
