var url = require('url');

module.exports = function(router) {
  return {
    setup: function(){
      $('.nav-tabs a').on('click', function(e) {
        e.preventDefault();
        router.setRoute(2, url.parse(this.href).hash.substr(1))
      });
    },

    index: function(id, resource, action) {
      console.log('ROOT', id, id === undefined)
      if (id === undefined) {
        $('#list').slideDown();
        $('#show').slideUp();
      }
    },

    show: function (id, resource, action) {
      console.log('networkShow')
      $('#list').slideUp();
      $('#show').slideDown();

      $('h2.text-muted').text('Showing network '+id)

      if (!resource)
        $('.nav-tabs a:first').tab('show')

    },

    resource: function(networkId, resource, action) {
      console.log('resourceShow')
      $('.nav-tabs a[href="#'+resource+'"]').tab('show')
      return false;
    },

    resourceAction: function(networkId, resource, action) {
      console.log('resourceAction')
      $('#'+resource+' strong').text(action)
    }
  }
}
