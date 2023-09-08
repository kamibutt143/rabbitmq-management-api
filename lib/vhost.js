/**
 * A module providing methods for managing RabbitMQ vHost
 * @module vhost
 */
module.exports = {

    /**
     * Retrieves a list of RabbitMQ virtual hosts based on provided parameters.
     *
     * @param {Object} body - An object containing parameters for retrieving virtual hosts.
     * @param {string} body.vhost - (Optional) The name of a specific virtual host to retrieve.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    listVhosts(body, _cb) {
        var path = '/api/vhosts'
        if (body && body.vhost) {
            path += '/' + encodeURIComponent(body.vhost)
        }
        this.client.get(path, _cb)
    },

    /**
     * Deletes a RabbitMQ virtual host based on the provided parameters.
     *
     * @param {Object} body - An object containing parameters for deleting a virtual host.
     * @param {string} body.vhost - The name of the virtual host to delete.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    deleteVhost(body, _cb) {
        var path = '/api/vhosts'
        if (!body || !body.vhost) {
            _cb(null, { message : 'Vhost name is missing' })
            return
        }
        path += '/' + encodeURIComponent(body.vhost)
        this.client.delete(path, _cb)
    },

    /**
     * Creates a new RabbitMQ virtual host based on the provided parameters.
     *
     * @param {Object} body - An object containing parameters for creating a virtual host.
     * @param {string} body.vhost - The name of the virtual host to create.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    createVhost(body, _cb) {
        var path = '/api/vhosts'
        if (!body || !body.vhost) {
            _cb(null, { message : 'Vhost name is missing' })
            return
        }
        path += '/' + encodeURIComponent(body.vhost)
        this.client.put(path, {}, _cb)
    },

    /**
     * Retrieves permissions for a specific RabbitMQ virtual host based on provided parameters.
     *
     * @param {Object} body - An object containing parameters for retrieving virtual host permissions.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getVhostPermissions(body, _cb) {
        var path = '/api/vhosts'
        if (!body || !body.vhost) {
            _cb(null, { message : 'Vhost name is missing' })
            return
        }
        path += '/' + encodeURIComponent(body.vhost) + '/permissions'
        this.client.get(path, _cb)
    }
};