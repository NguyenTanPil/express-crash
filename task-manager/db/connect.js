const mongoose = require('mongoose');

const connectToDB = (url) => {
	return mongoose
		.connect(url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Connected to the DB...');
		})
		.catch((error) => console.log({ error }));
};

module.exports = connectToDB;
