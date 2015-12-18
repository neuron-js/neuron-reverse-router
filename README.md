[![Build Status](https://travis-ci.org/neuron-js/neuron-reverse-router.svg?branch=master)](https://travis-ci.org/neuron-js/neuron-reverse-router)
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/neuron-reverse-router.svg)](http://badge.fury.io/js/neuron-reverse-router)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/neuron-reverse-router.svg)](https://www.npmjs.org/package/neuron-reverse-router)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/neuron-js/neuron-reverse-router.svg)](https://david-dm.org/neuron-js/neuron-reverse-router)
-->

# neuron-reverse-router

Reverse router to map a local filename to a url path according to router configurations of [neuron-dev-server](https://github.com/neuron-js/neuron-dev-server).

## Install

```sh
$ npm install neuron-reverse-router --save
```

## Usage

routers:

```js
[
  {
    location: '/mod',
    root: '/home/my/.static_modules/'
  },
  
  {
    location: '/old',
    root: ['/data/public']
  },
  
  {
    location: '/new',
    root: ['/data'],
    with_location: true
  }
]
```

```js
var rr = require('neuron-reverse-router');

rr.route('/data/public/a.js', routers); // '/old/a.js'
```

## License

MIT
