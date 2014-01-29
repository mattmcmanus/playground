var Ractive = require('ractify');
var _ = require('lodash');

var ChildResourceList = Ractive.extend({
  template: require('../views/resource/child-index.ract'),
  init: function ( options ) {
    var self = this;
    this.set('name', options.name)
    this.set('resourceId', options.resourceId)
    this.set('headers', options.headers)
    this.set('allResources', options.allResources)
    this.set('resources', function(id, allResources){
      var resources = _.filter(allResources, function(r){
        return ( r.network == id )
      })
      return resources;
    })
  }
});

module.exports = ChildResourceList;
