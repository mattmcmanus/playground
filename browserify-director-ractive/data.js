var resources = window.resources = exports.resources = [
  { id:1, name: "Pizza" },
  { id:2, name: "Science" },
  { id:3, name: "Florida" },
  { id:4, name: "Hermes" },
  { id:5, name: "Kansas" }
];

var childResourceTypes = exports.childResourceTypes =  [
  { key: "outbound", name: "Outbound Firewall" },
  { key: "inbound", name: "Inbound Firewall" },
  { key: "forwarding", name: "Port Forwarding" },
  { key: "balancing", name: "Load Balancer" }
];

var childResources = exports.childResources = {
  "outbound": {
    columns: ['IP Address', 'Private Port', 'Public Port'],
    data: [
      { network: 1, ip: '1.1.1.1', private: '8080', public: '80'},
      { network: 2, ip: '1.1.1.2', private: '8080', public: '80'},
      { network: 3, ip: '1.1.1.3', private: '8080', public: '80'},
      { network: 4, ip: '1.1.1.4', private: '8080', public: '80'},
      { network: 5, ip: '1.1.1.5', private: '8080', public: '80'}
    ]
  },
  "inbound": {
    columns: ['IP Address', 'Private Port', 'Public Port'],
    data: [
      { network: 1, ip: '1.1.1.1', private: '8080', public: '80'},
      { network: 2, ip: '1.1.1.2', private: '8080', public: '80'},
      { network: 3, ip: '1.1.1.3', private: '8080', public: '80'},
      { network: 4, ip: '1.1.1.4', private: '8080', public: '80'},
      { network: 5, ip: '1.1.1.5', private: '8080', public: '80'}
    ]
  },
  "forwarding": {
    columns: ['IP Address', 'Private Port', 'Public Port'],
    data: [
      { network: 1, ip: '1.1.1.1', private: '8080', public: '80'},
      { network: 2, ip: '1.1.1.2', private: '8080', public: '80'},
      { network: 3, ip: '1.1.1.3', private: '8080', public: '80'},
      { network: 4, ip: '1.1.1.4', private: '8080', public: '80'},
      { network: 5, ip: '1.1.1.5', private: '8080', public: '80'}
    ]
  },
  "balancing": {
    columns: ['IP Address', 'Private Port', 'Public Port'],
    data: [
      { network: 1, ip: '1.1.1.1', private: '8080', public: '80'},
      { network: 2, ip: '1.1.1.2', private: '8080', public: '80'},
      { network: 3, ip: '1.1.1.3', private: '8080', public: '80'},
      { network: 4, ip: '1.1.1.4', private: '8080', public: '80'},
      { network: 5, ip: '1.1.1.5', private: '8080', public: '80'}
    ]
  }
};
