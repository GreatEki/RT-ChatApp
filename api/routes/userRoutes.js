const express = require('express');

const router = express.Router();

const { addUser, getUsers, getUser } = require('../controllers/users');

router.route('/users/create-account').post(addUser);

router.route('/users/:id').get(getUser);

router.route('/users').get(getUsers);

module.exports = router;
