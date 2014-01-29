var $ = require('jquery');
require('bootstrap');

var Router = require('director').Router;
var router;

var routes = {
  '/': {
    on: 'index'
  },
  '/network/:networkId': {
    on: 'show',

    '/:resource': {
      on: 'resource',

      '/:action': {
        on: 'action'
      }
    }
  }
};

router = Router(routes);

var network = require('./controllers/network')(router);

router.configure({
  recurse: 'forward',
  resource: network,
  on: function(){console.log('global-on'); console.log('--------------------')},
  notfound: function(){console.log('not found', arguments)},
  before: network.init
});

$('document').ready(function(){
  console.log('Ready');
  router.init('/');
});
