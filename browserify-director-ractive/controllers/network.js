var url = require('url');
var _ = require('lodash');
var Ractive = require('ractify');

var data = require('../data.js')

module.exports = function(router) {
  var ResourceList = require('../lib/resource_list')(router);
  var ChildResourceList = require('../lib/child_resource_list');
  var ResourceShow = require('../lib/resource_show');

  var networkShow, networkList, childResourceShow = {};
  var init, index, form, show, resource, action;

  init = function(id, resourceType, action){
    console.log('init')

    networkList = new ResourceList({
      el: 'list',
      childResourceTypes: data.childResourceTypes,
      name: 'Network',
      columns: ['ID', 'Name', 'Actions'],
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

    data.childResourceTypes.forEach(function(type, index){
      childResourceShow[type.key] = new ChildResourceList({
        el: type.key+'_view',
        name: type.name,
        columns: data.childResources[type.key].columns,
        allResources: data.childResources[type.key].data
      })
    })
  }

  index = function(id, resourceType, action){
    console.log('networkIndex')
    if (!id) {
      networkList.set('visible', true)
      networkShow.set('visible', false)
    }
  }

  form = function() {
    console.log('networkForm')
    networkList.set('visible', 'form')
  }

  show = function(id, resourceType, action){
    console.log('networkShow')

    if (id) {
      networkList.set('visible', false)
      networkShow.set('visible', true)

      var resourceObject = _.find(data.resources, function(r){ return (r.id == id) })
      networkShow.set('resource', resourceObject)

      if (!resourceType) {
        resource(id, data.childResourceTypes[0].key)
      }
    }
  }

  resource = function(id, resourceType, action){
    console.log('resourceShow')
    childResourceShow[resourceType].set('resourceId', networkShow.get('resource.id'))
    $('.nav-tabs a[href="#'+resourceType+'"]').tab('show')

    return false;
  }

  action = function(id, resourceType, action){
    console.log('resourceAction')
  }

  return {
    init: init,
    index: index,
    form: form,
    show: show,
    resource: resource,
    action: action,
  }
}

