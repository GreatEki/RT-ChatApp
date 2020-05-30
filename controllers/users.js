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

// DESC: Funtion to find user;
// URL: /api/users/:id
exports.getOneUser = async (req, res) => {
	try {
		const id = req.params.id;

		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		} else {
			return res.status(200).json({
				success: true,
				message: 'User Found',
				user,
			});
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
};
