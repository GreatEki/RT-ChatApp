const express = require('express');

/* initialise app */
const app = express();

/* Express and BodyParser Middleware */
app.use(express.json());

/* Handling CORS */

app.use((req, res, next) => {
	// Allow access from specified origin
	res.header('Access-Control-Allow-Origin', '*');

	//Allow Access for specified headers
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	// Allow Access for Request Methods
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
		res.status(200).json({});
	}

	next();
});

app.use('/', require('./router/router'));

module.exports = app;
