const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');
const dbConnection = require('./config/database');

/* initialise our express app */
const app = express();

// BodyParser Middleware
app.use(express.json());

/* Create Server */
const server = http.createServer(app);

/* creating our socket server  */
const io = socketio(server);

dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

// Connect to Database
dbConnection();

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

app.use('/api', require('./api/router/router'));

const {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
} = require('./users/users');

io.on('connection', (socket) => {
	console.log('We have a new connection');

	/*  Handling Users joining a chat room
		Listens for request to join a chat*/
	socket.on('join', ({ name, room }, callback) => {
		const user = addUser(socket.id, name, room);

		// console.log(user);
		if (!user) {
			return callback({ error });
		} else {
			/* If no errors allow user join chat room  */

			// emit msg to User from admin
			socket.emit('message', {
				sender: 'admin',
				msgContent: `${user.name} welcome to ${user.room}`,
			});

			//broadcast msg to room users from admin
			/*The broadcast() is used to send messages to all connected users(socketsClients)
			 except the originating user(socketClients). */
			socket.broadcast.to(user.room).emit('message', {
				sender: 'admin',
				msgContent: `${user.name} has joined the chat`,
			});

			socket.join(user.room);

			callback();
		}
	});
	/* End of Handling Users joining a chat room */

	/* Listens to client messages  */
	socket.on('clientMessage', (userMsg, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', {
			sender: user.name,
			msgContent: userMsg,
		});

		callback();
	});

	socket.on('disconnect', () => {
		console.log('user has left');
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', {
				sender: 'admin',
				msgContent: `${user.name} has disconnected`,
			});
		}
	});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
