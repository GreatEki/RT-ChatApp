const express = require('express');

const router = express.Router();

const { addUser } = require('../controllers/users');

router.route('/users/create-account').post(addUser);

module.exports = router;
