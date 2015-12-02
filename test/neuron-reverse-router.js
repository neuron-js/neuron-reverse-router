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
  }
]);
