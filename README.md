# Node.js RabbitMQ HTTP API Client
The Node.js RabbitMQ HTTP API Client is a powerful library that allows you to interact with RabbitMQ, a leading message broker, via its HTTP API. It simplifies the process of managing various RabbitMQ components such as exchanges, queues, connections, nodes, and more, all from within your Node.js applications.

## Features
-   **Easy Setup**: Get started quickly by creating a client instance with your RabbitMQ server details.
-   **Comprehensive**: This library supports a wide range of RabbitMQ management functions, from viewing an overview of your RabbitMQ setup to managing individual components like queues and exchanges.
-   **Flexible**: Tailor your requests with filters and parameters to precisely control which data you retrieve or actions you perform.
-   **Error Handling**: Handle errors gracefully with callback functions, ensuring your application stays robust.
-   **Support**: This client library is designed to work with RabbitMQ 3.x versions and requires the RabbitMQ Management UI plugin to be installed and enabled.


## Installation
You can easily integrate this library into your Node.js project using npm:

```
npm install rabbitmq-management-api
```

## Supported RabbitMQ Versions
Our Node.js RabbitMQ HTTP API Client is compatible with RabbitMQ 3.x versions. Please note that to use this library, you must have the [RabbitMQ Management UI plugin](http://www.rabbitmq.com/management.html) installed and enabled for your RabbitMQ instance.

## Usage
Create a RabbitMQ Manager client
``` js
    // Import the RabbitMQManagerClient module from the specified path
    var RabbitMQManager = require('./RabbitMQManager.js');
    
    // Define configuration options for connecting to the RabbitMQ Management API
	const config = {
        baseURL: 'http://localhost:15671', // RabbitMQ Manager API base URL
        timeout: 5000, // Request timeout in milliseconds
        auth: {
            username: 'guest',
            password: 'guest'
        },
        https: false // Set to true for HTTPS
    };

    // Create a new instance of the RabbitMQManagerClient using the provided configuration
    var manager = new RabbitMQManager(config);

    // Retrieve cluster information by calling the getClusterName method
    manager.getClusterName(function  (result, error) {
		if (error) {
			console.log(error); // Log any errors that occur during the request
		} else {
			console.log(result); // Log the result if the request is successful
		}
	});
```