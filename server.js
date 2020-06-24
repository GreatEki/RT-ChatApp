const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');
const dbConnection = require('./config/database');

/* initialise our express app */
const app = express();

/* Create Server */
const server = http.createServer(app);

/* creating our socket server  */
const io = socketio(server);

dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

// Connect to Database
dbConnection();

// BodyParser Middleware
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
	}

	next();
});

app.use('/api/auth', require('./api/routes/authRoutes'));
app.use('/api/users', require('./api/routes/userRoutes'));

const chatBot = 'chatBot';

io.on('connection', (socket) => {
	const people = {};
	socket.on('joinUsers', ({ user }, callback) => {
		console.log(user);

		if (!user) {
			callback = () => {
				return {
					error: 'Awaiting load parameters',
				};
			};
		} else {
			// const name = user;
			// people[name] = socket.id;
			socket.join(user);

			socket.emit('message', {
				sender: chatBot,
				msgContent: `You are connected `,
			});
		}
	});

	socket.on('clientMessage', (message) => {
		const { userMsg, sender, toContact } = message;
		// const name = toContact;
		// people[name] = socket.id;
		// console.log(toContact);
		io.to(toContact).emit('message', {
			sender: sender,
			msgContent: userMsg,
		});
	});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
