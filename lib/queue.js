/**
 * A module providing methods for managing RabbitMQ Queue.
 * @module queue
 */
module.exports = {
    /**
     * Retrieves a list of queues based on provided parameters.
     *
     * @param {Object} body - An object containing parameters for retrieving queues.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {Object} body.query - Additional query parameters for filtering queues.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    listQueues(body, _cb) {
        var path = '/api/queues'
        if (body) {
            if (body.vhost) path += '/' + encodeURIComponent(body.vhost)
            if (body.query) path += `?${formUrlencoded(body.query)}`
        }
        this.client.get(path, _cb)
    },
    
    /**
     * Retrieves information about a specific queue.
     *
     * @param {Object} body - An object containing parameters for retrieving a queue.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.queue - The name of the queue.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getQueue(body, _cb) {
        var err = checkQueueParams(body)
        if (err) {
            _cb(null, err)
            return
        }
    
        var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue)
        this.client.get(path, _cb)
    },
    
    /**
     * Creates a new queue with the provided parameters.
     *
     * @param {Object} body - An object containing parameters for creating a queue.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.queue - The name of the queue.
     * @param {boolean} body.auto_delete - Whether the queue should be auto-deleted.
     * @param {boolean} body.durable - Whether the queue should be durable.
     * @param {string} body.node - The node where the queue should be located.
     * @param {Object} body.arguments - Additional arguments for configuring the queue.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    createQueue(body, _cb) {
        var err = checkQueueParams(body)
        if (err) {
            _cb(null, err)
            return
        }
        var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue)
        var putBody = {
            auto_delete : body.auto_delete,
            durable : body.durable,
            node : body.node,
            arguments : body.arguments
        }
        this.client.put(path, putBody, _cb)
    },
    
    /**
     * Deletes a specific queue based on provided parameters.
     *
     * @param {Object} body - An object containing parameters for deleting a queue.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.queue - The name of the queue.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    deleteQueue(body, _cb) {
        var err = checkQueueParams(body)
        if (err) {
            _cb(null, err)
            return
        }
        var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue)
        this.client.delete(path, _cb)
    },
    /**
     * Retrieves the bindings for a specific queue based on provided parameters.
     *
     * @param {Object} body - An object containing parameters for retrieving queue bindings.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.queue - The name of the queue.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getQueueBindings(body, _cb) {
        var err = checkQueueParams(body)
        if (err) {
            _cb(null, err)
            return
        }
        var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/bindings'
        this.client.get(path, _cb)
    },

    /**
     * Purges the contents of a specific queue based on provided parameters.
     *
     * @param {Object} body - An object containing parameters for purging a queue.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.queue - The name of the queue.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    purgeQueue(body, _cb) {
        var err = checkQueueParams(body)
        if (err) {
            _cb(null, err)
            return
        }
        var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/contents'
        this.client.delete(path, _cb)
    },

    /**
     * Performs actions on a specific queue based on provided parameters.
     *
     * @param {Object} body - An object containing parameters for queue actions.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.queue - The name of the queue.
     * @param {string} body.action - The action to be performed on the queue.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    setQueueActions(body, _cb) {
        var err = checkQueueParams(body)
        if (err) {
            _cb(null, err)
            return
        }
        if (!body.action) {
            _cb(null, { message : 'Action is missing' })
            return
        }
        var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/actions'
        this.client.post(path, {action : body.action}, _cb)
    },

    /**
     * Retrieves messages from a specific queue based on provided parameters.
     *
     * @param {Object} body - An object containing parameters for retrieving messages.
     * @param {string} body.vhost - The name of the virtual host.
     * @param {string} body.queue - The name of the queue.
     * @param {number} body.count - The number of messages to retrieve.
     * @param {boolean} body.requeue - Whether to requeue the messages after retrieval.
     * @param {string} body.encoding - The encoding format for the messages.
     * @param {boolean} body.truncate - Whether to truncate large messages.
     * @param {_cb} Function - The callback function to handle the response.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error.
     */
    getMessages(body, _cb) {
        var err = checkQueueParams(body)
        if (err) {
            _cb(null, err)
            return
        }
        if (!body.count || !body.requeue || !body.encoding ) {
            _cb(null, { message : 'Body missing mandatory field: count, requeue, encoding' })
            return
        }

        var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/get'
        var postBody = {
            count : body.count,
            requeue : body.requeue,
            encoding : body.encoding,
            truncate : body.truncate
        }
        this.client.post(path, postBody, _cb)
    }
}
