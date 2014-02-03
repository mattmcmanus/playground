var $ = require('jquery');
require('bootstrap');

var Router = require('director').Router;
var router;

var routes = {
  '/': {
    on: 'index'
  },
  '/new' : {
    on: 'form'
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
  recurse: 'backward',
  resource: network,
  on: function(){console.log('global-on'); console.log('--------------------')},
  notfound: function(){console.log('not found', arguments)},
  before: function(){ console.log('before') }
});

$('document').ready(function(){
  console.log('Ready');
  network.init();
  router.init('/');
});
