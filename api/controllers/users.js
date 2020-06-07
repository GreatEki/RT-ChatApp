const User = require('../models/userModel');

const getUsers = async (req, res) => {
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

const getUser = async (req, res) => {
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

const addContact = async (req, res) => {
	try {
		const currentUserId = req.params.id;

		const { id, firstname, lastname, username } = req.body;

		const newContact = {
			id,
			firstname,
			lastname,
			username,
		};

		/* const user = await User.findOne({ id: currentUserId });


		user.contacts.push(newContact);

		await user.save();

		
 */

		console.log(newContact);

		const response = await User.findOneAndUpdate(
			{ firstName: currentUserId },
			{ $push: { contacts: newContact } }
		);

		return res.status(200).json({
			success: true,
			message: 'Contact Added',
			newContact,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

const searchForcontacts = async (req, res) => {
	try {
		const value = req.params.value;

		const contacts = await User.find({
			$or: [
				{ firstName: { $regex: value, $options: 'i' } },
				{ lastName: { $regex: value, $options: 'i' } },
				{ userName: { $regex: value, $options: 'i' } },
			],
		});

		if (contacts) {
			return res.status(200).json({
				success: true,
				contacts: contacts.map((person) => {
					return {
						firstname: person.firstName,
						lastname: person.lastName,
						username: person.userName,
					};
				}),
			});
		} else {
			return res.status(200).json({
				success: false,
				message: 'contact Not Found',
			});
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

module.exports = { getUsers, getUser, addContact, searchForcontacts };
