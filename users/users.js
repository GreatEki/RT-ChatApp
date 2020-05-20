const users = [];

const addUser = (id, name, room) => {
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	/* Check if User exists */
	const existingUser = users.find(
		(user) => user.room === room && user.name === name
	);

	if (existingUser) {
		return { error: 'Username is taken' };
	}

	/* If user doesn't exist, save user as new user */
	const newUser = {
		id,
		name,
		room,
	};

	users.push(newUser);

	return newUser;
};

const removeUser = (id) => {
	/* 	//Method 1: To remove user from Users array
	const index = users.findIndex((user) => user.id === id);

	if (index != -1) {
		return users.splice(index, 1)[0];
	} */

	// // Method 2: To remove user from users array
	users = users.filter((user) => user.id != id);
};

const getUser = () => {
	const user = users.find((user) => user.id === id);

	return user;
};

const getUsersInRoom = (room) => {
	const usersInRoom = user.filter((user) => user.room === room);
	return usersInRoom;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
