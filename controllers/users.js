const User = require('../models/users');
const bcrypt = require('bcrypt');

// DESC: function to create User Account/profile
// URL: '/api/users/create-account'
// REQUEST: POST
exports.addUser = async (req, res) => {
	try {
		const { firstName, lastName, email, userName, password } = req.body;

		// Check if user exists
		const existingUser = await User.find({ email });

		if (existingUser.lenght > 0) {
			return res.status(400).json({
				success: false,
				message: 'Existing User',
			});
		} else {
			//Create and save user

			const newUser = new User({
				firstName,
				lastName,
				email,
				userName,
				password,
			});

			//Hash password

			const hash = await bcrypt.hash(newUser.password, 10);

			newUser.password = hash;

			//Save User
			const savedUser = await User.create(newUser);

			return res.status(201).json({
				success: true,
				message: 'Profile created successfully',
				user: {
					id: savedUser._id,
					firstName: savedUser.firstName,
					lastName: savedUser.lastName,
					email: savedUser.email,
					userName: savedUser.userName,
				},
			});
		}
	} catch (err) {
		console.log(err);
	}
};
