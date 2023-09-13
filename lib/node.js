/**
 * A module providing methods for managing RabbitMQ Node
 * @module node
 */
module.exports = {
    /**
     * Retrieves a list of all nodes in the RabbitMQ cluster.
     *
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    listNodes(_cb) {
        const path = '/api/nodes';
        return this.client.get(path, _cb);
    },

    /**
     * Retrieves information about a specific RabbitMQ node.
     *
     * @param {Object} body - An object containing parameters for the request.
     * @param {string} body.name - The name of the node to retrieve information about.
     * @param {boolean} [body.memory] - Whether to include memory information for the node.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     *
     * @notes
     * If the `memory` parameter is provided as `true`, memory information for the node will be included in the response.
     */
    getNode(body, _cb) {
        let path = '/api/nodes/';
        if (!body || !body.name) {
            _cb(null, { errorMessage : 'Node name not provided'});
            return;
        }
        path += encodeURIComponent(body.name);
        if (body.memory) {
            path += '?memory=true';
        }
        return this.client.get(path, _cb);
    }
};