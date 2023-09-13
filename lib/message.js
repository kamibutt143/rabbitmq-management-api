/**
 * A module providing methods for managing RabbitMQ Message.
 * @module message
 */
module.exports = {
    publishMessage(body, _cb) {
        if (!body || !body.vhost) {
            _cb({ errorMessage : 'Vhost name not provided' });
            return;
        }
        if (!body.exchange) {
            _cb({ errorMessage : 'Exchange name not provided' });
            return;
        }
        if (!body.properties || !body.routing_key || !body.payload || !body.payload_encoding) {
            _cb({ errorMessage : 'Body missing mandatory field: properties, routing_key, payload, payload_encoding' });
            return;
        }
        const path = `/api/exchanges/${encodeURIComponent(body.vhost)}/${encodeURIComponent(body.exchange)}/bindings/destination`;
        const postBody = {
            properties : body.properties,
            routing_key : body.routing_key,
            payload : body.payload,
            payload_encoding : body.payload_encoding
        };
        this.client.post(path, postBody, _cb);
    },
    getMessages(body, _cb) {
        let err = checkQueueParams(body);
        if (err) {
            _cb(null, err);
            return;
        }
        if (!body.count || !body.requeue || !body.encoding ) {
            _cb(null, { errorMessage : 'Body missing mandatory field: count, requeue, encoding' })
            return
        }
    
        const path = `/api/queues/${encodeURIComponent(body.vhost)}/${encodeURIComponent(body.queue)}/get`
        const postBody = {
            count : body.count,
            requeue : body.requeue,
            encoding : body.encoding,
            truncate : body.truncate
        }
        this.client.post(path, postBody, _cb)
    }
};