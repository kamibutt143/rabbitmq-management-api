/**
 * A module providing methods for managing RabbitMQ Bindings.
 * @module bindings
 */
module.exports = {
    /**
     * Retrieves bindings where the given exchange is the source.
     *
     * @param {Object} body - An object containing parameters for retrieving bindings.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.exchange - The name of the exchange.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getBindingsForSource(body, _cb) {
        if (!body || !body.vhost) {
            _cb(null, { errorMessage : 'Vhost name not provided' });
            return;
        }
        if (!body.exchange) {
            _cb(null, { errorMessage : 'Exchange name not provided' });
            return;
        }
        const path = `/api/exchanges/${encodeURIComponent(body.vhost)}/${encodeURIComponent(body.exchange)}/bindings/source`;

        this.client.get(path, _cb);
    },

    /**
     * Retrieves bindings where the given exchange is the destination.
     *
     * @param {Object} body - An object containing parameters for retrieving bindings.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.exchange - The name of the exchange.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getBindingsForDestination(body, _cb) {
        if (!body || !body.vhost) {
            _cb(null, { errorMessage : 'Vhost name not provided' });
            return;
        }
        if (!body.exchange) {
            _cb({ errorMessage : 'Exchange name not provided' });
            return;
        }
        const path = `/api/exchanges/${encodeURIComponent(body.vhost)}/${encodeURIComponent(body.exchange)}/bindings/destination`;
        this.client.get(path, _cb)
    },
    listBindings(body, _cb) {
        let path = '/api/bindings'
        if (body && body.vhost) {
            path += '/' + encodeURIComponent(body.vhost)
        }
        this.client.get(path, _cb)
    }
};
