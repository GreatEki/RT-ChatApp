const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		const conn = await mongoose.connect(process.env.URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log(`Database Connection Successful: ${conn.connection.host}`);
	} catch (err) {
		console.log(`Database Connection Failure ${err.message}`);
	}
};

module.exports = dbConnection;
