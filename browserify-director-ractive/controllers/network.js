var url = require('url');
var _ = require('lodash');
var Ractive = require('ractify');

var ResourceList = require('../lib/resource_list');
var ChildResourceList = require('../lib/child_resource_list');
var ResourceShow = require('../lib/resource_show');

var data = require('../data.js')


module.exports = function(router) {
  var networkShow, networkList, childResourceShow = {};

  var instantiated = false;

  var init = function(id, resource, action){
    console.log('init')

    if (!instantiated) {
      networkList = new ResourceList({
        el: 'list',
        childResourceTypes: data.childResourceTypes,
        name: 'Network',
        headers: ['ID', 'Name'],
        resources: data.resources
      })

      networkShow = new ResourceShow({
        el: 'show',
        resource: {},
        childResourceTypes: data.childResourceTypes
      })

      $('.nav-tabs a').on('click', function(e) {
        e.preventDefault();
        router.setRoute(2, url.parse(this.href).hash.substr(1))
      });

      data.childResourceTypes.forEach(function(resource, key){
        childResourceShow[resource.key] = new ChildResourceList({
          el: resource.key+'_view',
          name: resource.name,
          headers: data.childResources[resource.key].header,
          allResources: data.childResources[resource.key].data
        })
      })

      instantiated = true;
    }
  }

  var index = function(id, resource, action){
    console.log('networkIndex')
    if (!id) {
      networkList.set('visible', true)
      networkShow.set('visible', false)
    }
  }

  var show = function(id, resource, action){
    console.log('networkShow')

    if (id) {
      networkList.set('visible', false)
      networkShow.set('visible', true)

      var resourceObject = _.find(data.resources, function(r){ return (r.id == id) })
      networkShow.set('resource', resourceObject)

      if (!resource)
        $('.nav-tabs a:first').tab('show')
    }
  }

  var resource = function(id, resource, action){
    console.log('resourceShow')
    childResourceShow[resource].set('resourceId', networkShow.get('resource.id'))
    $('.nav-tabs a[href="#'+resource+'"]').tab('show')
  }

  var action = function(id, resource, action){
    console.log('resourceAction')
  }

  return {
    init: init,
    index: index,
    show: show,
    resource: resource,
    action: action,
  }
}

