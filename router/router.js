const express = require('express');

const router = express.Router();

const { addUser, getOneUser } = require('../controllers/users');

router.route('/:id').get(getOneUser);

router.route('/create-account').post(addUser);

module.exports = router;
