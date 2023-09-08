/**
 * A module providing methods for managing RabbitMQ channels.
 * @module channels
 */
module.exports = {
    /**
     * Retrieves a list of all channels in the RabbitMQ cluster.
     *
     * @param {Object} body - An object containing parameters for the request.
     * @param {string} body.vhost - The name of the virtual host to filter channels by (optional).
     * @param {string} body.connection - The name of the connection to filter channels by (optional).
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    listChannels(body, _cb) {
        var path = '/api/channels';
    
        if (body && body.vhost) {
            path = '/api/vhosts/' + encodeURIComponent(body.vhost) + '/channels';
        }
    
        if (body && body.connection) {
            path = '/api/connections/' + encodeURIComponent(body.connection) + '/channels';
        }
        return this.client.get(path, _cb);
    },

    /**
     * Retrieves information about a specific RabbitMQ channel.
     *
     * @param {Object} body - An object containing parameters for the request.
     * @param {string} body.channel - The name of the channel to retrieve information about.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getChannel(body, _cb) {
        var path = '/api/channels/';
        if (!body || !body.channel) {
            _cb(null, { message : 'Channel name not provided' });
            return;
        }
    
        path += encodeURIComponent(body.channel);
        return this.client.get(path, _cb);
    }
};
