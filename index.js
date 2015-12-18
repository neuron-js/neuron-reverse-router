'use strict';

var node_path = require('path');
var node_url = require('url');

exports.route = function (file, routers) {
  if (!file || !routers || !routers.length) {
    return null;
  }

  var found;
  routers.some(function (router) {
    if (!router || !router.location || !router.root) {
      return;
    }

    var roots = 

    if (!~file.indexOf(router.root)) {
      return;
    }

    var relative = node_path.relative(router.root, file);
    if (relative.indexOf('/') === 0 || relative.indexOf('../') === 0) {
      return;
    }

    var location = exports._make_sure_trailing_slash(router.location);
    found = node_url.resolve(location, relative);
    return true;
  });

  return found || null;
};


exports._make_sure_trailing_slash = function (str) {
  return str.replace(/\/*$/, '/');
};
