const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.send(`Router up and running in ${process.env.NODE_ENV} mode`);
});

module.exports = router;
