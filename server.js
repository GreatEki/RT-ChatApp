const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');

const {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
} = require('./users/users');

/* Create Server */
const server = http.createServer(app);

/* sockets  */
const io = socketio(server);

io.on('connection', (socket) => {
	console.log('We have a new connection');

	socket.on('join', ({ name, room }, callback) => {
		console.log(name, room);
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
