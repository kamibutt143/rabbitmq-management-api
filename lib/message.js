/**
 * A module providing methods for managing RabbitMQ Message.
 * @module message
 */
module.exports = {
    publishMessage(body, _cb) {
        if (!body || !body.vhost) {
            _cb({ message : 'Vhost name not provided' });
            return;
        }
        if (!body.exchange) {
            _cb({ message : 'Exchange name not provided' });
            return;
        }
        if (!body.properties || !body.routing_key || !body.payload || !body.payload_encoding) {
            _cb({ message : 'Body missing mandatory field: properties, routing_key, payload, payload_encoding' });
            return;
        }
        var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange) + '/bindings/destination';
        var postBody = {
            properties : body.properties,
            routing_key : body.routing_key,
            payload : body.payload,
            payload_encoding : body.payload_encoding
        };
        this.client.post(path, postBody, _cb);
    },
    getMessages(body, _cb) {
        var err = checkQueueParams(body);
        if (err) {
            _cb(null, err);
            return;
        }
        if (!body.count || !body.requeue || !body.encoding ) {
            _cb(null, { message : 'Body missing mandatory field: count, requeue, encoding' })
            return
        }
    
        var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/get'
        var postBody = {
            count : body.count,
            requeue : body.requeue,
            encoding : body.encoding,
            truncate : body.truncate
        }
        this.client.post(path, postBody, _cb)
    }
};