var Ractive = require('ractify');

module.exports = function(router) {

  var ResourceList = Ractive.extend({
    template: require('../views/resource/index.ract'),
    init: function ( options ) {
      var self = this;
      this.set('name', options.name)
      this.set('columns', options.columns)
      this.set('resources', options.resources)

      this.set('showList', true)
      this.set('showForm', false)

      this.set('showForm', function(){
        console.log('this.get("visible")', this.get('visible'))
        return ( this.get('visible') === 'form' ) })

      this.observe('visible', function(newValue, oldValue, keypath) {
        if (newValue === 'form') {
          this.set('showForm', true)
          this.set('showList', false)
        } else if (newValue == false) {
          this.set('showForm', false)
          this.set('showList', false)
        } else {
          this.set('showForm', false)
          this.set('showList', true)
        }
      })

      this.on({
        delete: function(event, index) {
          this.get('resources').splice(index, 1)
        },
        newResource: function(event) {
          event.original.preventDefault();

          var network = {
            id: this.get('newId'),
            name: this.get('newName')
          }

          this.get('resources').push(network)

          this.set({ newId: '', newName: '' });

          router.setRoute('/');
        }
      })
    }
  });

  return ResourceList
}
