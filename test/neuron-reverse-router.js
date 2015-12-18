'use strict';

var expect = require('chai').expect;
var neuron_reverse_router = require('../');
var run = require('run-mocha-cases');

var routers = [
  {
    location: '/mod',
    root: '/home/my/.static_modules/'
  },
  {
    location: '/old',
    root: '/data/public'
  },
  {
    location: '/old-2',
    root: '/data/public'
  },
  {
    location: '/new/',
    root: '/data/new-public'
  },
  {
    location: '/invalid'
  },
  {
    root: '/another/invalid'
  },
  {
    location: '/array',
    root: ['/data/array', '/data/array2']
  },

  {
    location: '/with_location',
    root: '/with',
    with_location: true
  }
];

run().description('router.route').runner(function (file) {
  return neuron_reverse_router.route(file, routers);
}).start([
  {
    d: 'with ending slash',
    a: '/data/new-public/a.js',
    e: '/new/a.js'
  },

  {
    d: 'without ending slash, and priority',
    a: '/data/public/a.js',
    e: '/old/a.js'
  },

  {
    d: 'invalid, no location',
    a: '/another/invalid/a.js',
    e: null
  },

  {
    d: 'invalid parameter',
    a: undefined,
    e: null
  },

  {
    d: 'no routers',
    r: function (file) {
      return neuron_reverse_router.route(file);
    },
    a: '/data/new-public/a.js',
    e: null
  },

  {
    d: 'empty routers',
    r: function (file) {
      return neuron_reverse_router.route(file, []);
    },
    a: '/data/new-public/a.js',
    e: null
  },

  {
    d: '1.1.0: multi roots, first met',
    a: '/data/array/a.js',
    e: '/array/a.js'
  },

  {
    d: '1.1.0: multi roots, second met',
    a: '/data/array2/a.js',
    e: '/array/a.js'
  },

  {
    d: '1.1.0: with_location, found',
    a: '/with/with_location/a.js',
    e: '/with_location/a.js'
  }
]);
