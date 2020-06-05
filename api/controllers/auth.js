const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check for user

		const user = await user.find({
			$or: [{ email: username }, { userName: userName }],
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'Credentials Not Found',
			});
		} else {
			//Validate password
			const isValid = await bcrypt.compare(password, user.password);

			if (!isValid) {
				return res.status(401).json({
					success: false,
					message: 'Authentication Denied',
				});
			} else {
				//Generate Token
				const token = await jwt.sign(
					{ email: user.email, id: user._id },
					process.env.jwtKey,
					{
						expiresIn: '1h',
					}
				);

				return res.status(201).json({
					success: true,
					message: 'Authentication Success',
					user,
					token,
				});
			}
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Error occured',
			errror: err.message,
		});
	}
};
