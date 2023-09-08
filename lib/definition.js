/**
 * A module providing methods for managing RabbitMQ definitions.
 * @module definition
 */

module.exports = {
    /**
     * Retrieves the RabbitMQ definitions.
     *
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    listDefinitions(_cb) {
        var path = '/api/definitions';
        this.client.get(path, _cb);
    },

    /**
     * Sets the RabbitMQ definitions.
     *
     * @param {Object} body - An object containing parameters for setting the definitions.
     * @param {string} body.definition - The definition to be set.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    setDefinitions(body, _cb) {
        var path = '/api/definitions';
        if (!body || !body.definition) {
            _cb(null, { message : 'Definition not provided' });
            return;
        }
        this.client.post(path, {file : body.definition}, _cb);
    }
};
