var test = require('tape');

var router = {};

var ResourceList = require('../lib/resource_list')(router);

networkList = new ResourceList({
  childResourceTypes: { key: 'test', name: 'Test Test'},
  name: 'Network',
  columns: ['ID', 'Name', 'Actions'],
  resources: [{ id: '1', name: 'test resource'}]
})

var html = networkList.toHTML();

test('initial render', function (t) {
  t.plan(2);
  t.ok(html.match('<h1>Networks'), 'Networks Title')
  t.ok(html.match('<a href="#/network/1">test resource</a>'), 'Networks Title')
});
