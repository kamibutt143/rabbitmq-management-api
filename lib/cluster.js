/**
 * A module providing methods for managing RabbitMQ Cluster
 * @module cluster
 */
module.exports = {
    /**
    * Retrieves the name of the RabbitMQ cluster.
    * @param {function} _cb - The callback function.
    * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
    */
    getClusterName(_cb) {
        const path = '/api/cluster-name';
        return this.client.get(path, _cb);
    },

    /**
     * Sets the name of the RabbitMQ cluster.
     * @param {Object} body - The request body containing the new cluster name.
     * @param {string} body.name - The new cluster name.
     * @param {function} _cb - The callback function.
     * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
     */
    setClusterName(body, _cb) {
        const path = '/api/cluster-name';
        if (!body || !body.name) {
            _cb(null, { errorMessage : 'Name not provided' });
            return;
        }
        return this.client.put(path, { name: body.name }, _cb);
    }
};