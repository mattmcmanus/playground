var Ractive = require('ractify');

var ResourceShow = Ractive.extend({
  template: require('../views/resource/show.ract'),
  init: function ( options ) {
    var self = this;

    this.set('resource', options.resource)
    this.set('childResourceTypes', options.childResourceTypes)
  }
});

module.exports = ResourceShow;

