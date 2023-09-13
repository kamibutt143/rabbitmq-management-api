/**
 * A module providing generic methods for managing RabbitMQ.
 * @module generic
 */
module.exports = {
    checkQueueParams(body) {
        if (!body || !body.vhost) {
            return { errorMessage : 'Vhost not provided' }
        }
        if (!body.queue) {
            return { errorMessage : 'Queue not provided' }
        }
        return null
    },
    /**
    * Retrieves an overview of the RabbitMQ cluster.
    * @param {function} _cb - The callback function.
    * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
    */
    overview(_cb) {
        const path = '/api/cluster-name';
        return this.client.get(path, _cb);
    },
    listExtensions(_cb) {
        const path = '/api/extensions';
        this.client.get(path, _cb);
    },
    listConsumers(body, _cb) {
        const path = '/api/consumers';
        if (body) {
            if (body.vhost) path += '/' + encodeURIComponent(body.vhost);
            if (body.query) path += `?${formUrlencoded(body.query)}`;
        }
        this.client.get(path, _cb);
    },
    publishMessage(body, _cb) {
        if (!body || !body.vhost) {
            _cb(null, { errorMessage : 'Vhost name not provided' });
            return;
        }
        if (!body.exchange) {
            _cb(null, { errorMessage : 'Exchange name not provided' });
            return;
        }
        if (!body.properties || !body.routing_key || !body.payload || !body.payload_encoding) {
            _cb(null, { errorMessage : 'Body missing mandatory field: properties, routing_key, payload, payload_encoding' });
            return;
        }
        const path = `/api/exchanges/${encodeURIComponent(body.vhost)}/${encodeURIComponent(body.exchange)}/bindings/destination`
        const postBody = {
            properties : body.properties,
            routing_key : body.routing_key,
            payload : body.payload,
            payload_encoding : body.payload_encoding
        };
        this.client.post(path, postBody, _cb)
    }
};