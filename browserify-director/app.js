var $ = require('jquery');
require('bootstrap');

var Router = require('director').Router;
var router;

// Notes:
// - Don't use both once and on
var routes = {
  '/': {
    on: 'index'
  },
  '/network/:networkId': {
    once: 'setup',
    on: 'show',

    '/:resource': {
      on: 'resource',

      '/:action': {
        on: 'resourceAction'
      }
    }
  }
};

router = Router(routes);

var network = require('./lib/network')(router);

router.configure({
  recurse: 'forward',
  resource: network,
  on: function(){console.log('global-on'); console.log('--------------------')},
  notfound: function(){console.log('notfound', arguments)},
  before: function(){console.log('global-before', arguments)}
});

$('document').ready(function(){
  console.log('Ready');
  router.init();
});
