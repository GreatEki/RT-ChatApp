const express = require('express');

const router = express.Router();

const {
	getUsers,
	getUser,
	addContact,
	searchForcontacts,
} = require('../controllers/users');

router.route('/:id').get(getUser);

router.route('/contacts/:id').post(addContact);

router.route('/search/:value').get(searchForcontacts);

router.route('/').get(getUsers);

module.exports = router;
