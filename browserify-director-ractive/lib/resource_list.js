var Ractive = require('ractify');

var ResourceList = Ractive.extend({
  template: require('../views/resource/index.ract'),
  init: function ( options ) {
    var self = this;
    this.set('name', options.name)
    this.set('headers', options.headers)
    this.set('resources', options.resources)
  }
});

module.exports = ResourceList;
