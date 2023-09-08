/**
 * A module providing methods for managing RabbitMQ Connection
 * @module connection
 */
module.exports = {
    /**
     * Retrieves a list of all connections in the RabbitMQ cluster.
     *
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    listConnections(_cb) {
        var path = '/api/connections';
        return this.client.get(path, _cb);
    },
    /**
     * Retrieves information about a specific RabbitMQ connection.
     *
     * @param {Object} body - An object containing parameters for the request.
     * @param {string} body.connection - The name of the connection to retrieve information about.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getConnection(body, _cb) {
        var path = '/api/connections/';
        if (!body || !body.connection) {
            _cb(null, { message : 'Connection name not provided' });
            return;
        }
        path += encodeURIComponent(body.connection);
        return this.client.get(path, _cb);
    },
    /**
     * Closes a specific RabbitMQ connection.
     *
     * @param {Object} body - An object containing parameters for the request.
     * @param {string} body.connection - The name of the connection to close.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    closeConnection(body, _cb) {
        var path = '/api/connections/';
        if (!body || !body.connection) {
            _cb(null, { message : 'Connection name not provided' });
            return;
        }
        path += encodeURIComponent(body.connection);
        return this.client.delete(path, _cb);
    }
};
