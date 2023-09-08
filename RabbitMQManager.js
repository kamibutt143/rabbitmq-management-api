const generic = require('./lib/generic.js');
const bindings = require('./lib/binding.js');
const channel = require('./lib/channel.js');
const cluster = require('./lib/cluster.js');
const connection = require('./lib/connection.js');
const definition = require('./lib/definition.js');
const exchange = require('./lib/exchange.js');
const node = require('./lib/node.js');
const queue = require('./lib/queue.js');
const vhost = require('./lib/vhost.js');

const RabbitMQAPIClient = require('./RabbitMQAPIClient.js');
/**
 * Represents a RabbitMQ Manager client for interacting with RabbitMQ APIs.
 */
class RabbitMQManager {
    /**
    * Constructs a new RabbitMQManagerClient instance.
    */
    constructor(config) {
        
        this.client = new RabbitMQAPIClient(config);
        
        Object.assign(this, generic);
        Object.assign(this, bindings);
        Object.assign(this, channel);
        Object.assign(this, cluster);
        Object.assign(this, connection);
        Object.assign(this, definition);
        Object.assign(this, exchange);
        Object.assign(this, node);
        Object.assign(this, queue);
        Object.assign(this, vhost);
    }
    
}

module.exports = RabbitMQManager;