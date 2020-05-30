const User = require('../models/userModel');
const bcrypt = require('bcrypt');
exports.addUser = async (req, res) => {
	try {
		const { firstName, lastName, email, userName, password } = req.body;

		const existingUser = await User.find({ email });

		if (existingUser.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'User profile already in use',
			});
		} else {
			//save the user

			const newUser = new User({
				firstName,
				lastName,
				email,
				userName,
				password,
			});

			// hash the password

			const hash = await bcrypt.hash(newUser.password, 10);

			newUser.password = hash;

			const savedUser = await User.create(newUser);

			return res.status(201).json({
				success: true,
				message: 'User saved successfully',
				user: savedUser,
			});
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err,
		});
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({});

		return res.status(200).json({
			success: true,
			users,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err.message,
		});
	}
};

exports.getUser = async (req, res) => {
	try {
		const id = req.params.id;

		const user = await User.findById(id);

		return res.status(200).json({
			success: true,
			message: 'User found',
			user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err.message,
		});
	}
};
