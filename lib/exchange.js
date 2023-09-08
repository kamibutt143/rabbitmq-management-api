/**
 * A module providing methods for managing RabbitMQ Exchange.
 * @module exchange
 */

module.exports = {
    /**
     * Retrieves a list of all exchanges in the RabbitMQ cluster or within a specific virtual host.
     *
     * @param {Object} body - An object containing parameters for the request.
     * @param {string} body.vhost - The name of the virtual host to filter exchanges by (optional).
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    listExchanges(body, _cb) {
        var path = '/api/exchanges';
        if (body && body.vhost) {
            path += '/' + encodeURIComponent(body.vhost);
        }
        return this.client.get(path, _cb);
    },

    /**
     * Retrieves information about a specific exchange in RabbitMQ.
     *
     * @param {Object} body - An object containing parameters for the request.
     * @param {string} body.vhost - The name of the virtual host containing the exchange.
     * @param {string} body.exchange - The name of the exchange to retrieve information about.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getExchange(body, _cb) {
        if (!body || !body.vhost) {
            _cb(null, { message : 'Vhost name not provided' });
            return;
        }
        if (!body.exchange) {
            _cb(null, { message : 'Exchange name not provided' });
            return;
        }
        var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange);
        return this.client.get(path, _cb);
    },

    /**
     * Creates a new exchange in RabbitMQ.
     *
     * @param {Object} body - An object containing parameters for creating the exchange.
     * @param {string} body.vhost - The name of the virtual host where the exchange will be created.
     * @param {string} body.exchange - The name of the exchange to be created.
     * @param {string} body.type - The type of the exchange (e.g., 'direct', 'topic', 'fanout').
     * @param {boolean} body.auto_delete - Whether the exchange should be auto-deleted (optional).
     * @param {boolean} body.durable - Whether the exchange should be durable (optional).
     * @param {boolean} body.internal - Whether the exchange is internal (optional).
     * @param {Object} body.arguments - Additional arguments for the exchange (optional).
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    createExchange(body, _cb) {
        if (!body || !body.vhost) {
            _cb(null, { message : 'Vhost not provided' });
            return;
        }
        if (!body.exchange) {
            _cb(null, { message : 'Exchange name not provided' })
            return;
        }
        if (!body.type) {
            _cb(null, { message : 'Exchange type not provided' });
            return;
        }
        var putBody = {
            type : body.type,
            auto_delete : body.auto_delete,
            durable : body.durable,
            internal : body.internal,
            arguments : body.arguments
        }
        var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange);
        return this.client.put(path, putBody, _cb);
    },

    /**
     * Deletes a specific exchange in RabbitMQ.
     *
     * @param {Object} body - An object containing parameters for deleting the exchange.
     * @param {string} body.vhost - The name of the virtual host containing the exchange.
     * @param {string} body.exchange - The name of the exchange to be deleted.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    deleteExchange(body, _cb) {
        if (!body || !body.vhost) {
            _cb(null, { message : 'Vhost name not provided' });
            return;
        }
        if (!body.exchange) {
            _cb(null, { message : 'Exchange name not provided' });
            return;
        }
        var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange);
        return this.client.delete(path, _cb);
    }
};
