'use strict';

var node_path = require('path');
var node_url = require('url');
var make_array = require('make-array');
var utils = require('neuron-router').utils;

exports.route = function (file, routers) {
  if (!file || !routers || !routers.length) {
    return null;
  }

  var found;
  routers.some(function (router) {
    if (!router || !router.location || !router.root) {
      return;
    }

    var roots = make_array(router.root);
    var matched_relative;

    roots.some(function (root) {
      if (router.with_location) {
        root = utils.join_file_path(root, router.location);
      }

      if (!~file.indexOf(root)) {
        return;
      }

      var relative = node_path.relative(root, file);
      // so that '/data/array2/a.js' will not match '/data/array'
      if (relative.indexOf('/') === 0 || relative.indexOf('../') === 0) {
        return;
      }

      matched_relative = relative;
      return true;
    });

    if (!matched_relative) {
      return;
    }
    

    var location = utils.make_sure_trailing_slash(router.location);
    found = node_url.resolve(location, matched_relative);
    return true;
  });

  return found || null;
};
