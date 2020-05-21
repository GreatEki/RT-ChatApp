const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');

/* initialise app */
const app = express();

/* Create Server */
const server = http.createServer(app);

/* sockets  */
const io = socketio(server);

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
	});
});

const PORT = process.env.PORT || 5000;

dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

server.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
