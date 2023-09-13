const axios = require('axios');

class RabbitMQAPIClient {
    /**
    * Constructs an instance of the RabbitMQAPIClient class.
    */
    constructor(config) {
        this.timeout = config.timeout || 25000; // Default timeout
        this.options = {}; // Initialize empty options
        this.setOptions(config);
    }

    /**
    * Sets the options for the HTTP requests.
    * @param {Object} options - The options for HTTP requests.
    */
    setOptions(options) {
        this.options = JSON.parse(JSON.stringify(options));
    }

    /**
    * Makes an HTTP request with the given method, path, and optional body.
    * @param {string} path - The URL path for the request.
    * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
    * @param {Object|null} body - The request body (if applicable).
    * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
    */
    async request(path, method, body) {
        this.options.url = path;
        this.options.method = method;

        try {
            const response = await axios({
                ...this.options,
                data: body,
                timeout: this.timeout,
            });

            const data = response.data;

            if (response.status < 200 || response.status > 299) {
                if (typeof this.cb === 'function') {
                    this.cb(null, response);
                    return;
                }
                const error = new Error(`Request failed with status ${response.status}`);
                error.response = response;
                throw error;
            }
            
            if (typeof this.cb === 'function') {
                this.cb(data);
                return;
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Makes an HTTP GET request to the specified path.
    * @param {string} path - The URL path for the GET request.
    * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
    */
    async get(path, _cb) {
        this.cb = _cb;
        return this.request(path, 'GET', null);
    }

    /**
    * Makes an HTTP PUT request to the specified path with the given body.
    * @param {string} path - The URL path for the PUT request.
    * @param {Object} body - The request body for the PUT request.
    * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
    */
    async put(path, body, _cb) {
        this.cb = _cb;
        return this.request(path, 'PUT', body);
    }

    /**
    * Makes an HTTP POST request to the specified path with the given body.
    * @param {string} path - The URL path for the POST request.
    * @param {Object} body - The request body for the POST request.
    * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
    */
    async post(path, body, _cb) {
        this.cb = _cb;
        return this.request(path, 'POST', body);
    }
    /**
    * Makes an HTTP DELETE request to the specified path.
    * @param {string} path - The URL path for the DELETE request.
    * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
    */
    async delete(path, _cb) {
        this.cb = _cb;
        return this.request(path, 'DELETE', null);
    }

    /**
    * Sets the timeout for HTTP requests.
    * @param {number} timeout - The timeout value in milliseconds.
    */
    setTimeout(timeout) {
        this.timeout = timeout;
    }
}

module.exports = RabbitMQAPIClient;