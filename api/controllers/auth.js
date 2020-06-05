const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jwtKey = require('../../config/config').jwtKey;
const bcrypt = require('bcrypt');

// DESC: Authenticates User
// URL: '/auth/login'
// REQUEST TYPE: POST
exports.login = async (req, res, next) => {
	try {
		const { userName, password } = req.body;

		//Check if email is valid
		const user = await User.findOne({
			$or: [{ userName }, { email: userName }],
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'No record of credentials',
			});
		} else {
			//Validate password
			const isValid = await bcrypt.compare(password, user.password);

			if (!isValid) {
				return res.status(404).json({
					success: false,
					message: 'Authentication Denied',
				});
			} else {
				//Generate token with jwt
				//The jwt.sign() takes in three arguments -
				//1. The payload which is user information
				//2. the secret jwt jey
				//3. an expiration duration
				const token = await jwt.sign(
					{ email: user.email, id: user._id },
					jwtKey,
					{
						expiresIn: '1h',
					}
				);

				return res.status(201).json({
					success: true,
					message: 'Authentication succeeded',
					user,
					token,
				});
			}
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Server Error',
			error: err.message,
		});
	}
};
