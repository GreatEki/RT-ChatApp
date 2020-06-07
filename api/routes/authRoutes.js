const express = require('express');
const router = express.Router();

const { login, addUser } = require('../controllers/auth');

router.route('/login').post(login);
router.route('/create-account').post(addUser);

module.exports = router;
