const express = require('express');
const tasks = require('./routes/tasks');
const app = express();
const connectToDB = require('./db/connect');
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
require('dotenv').config();

const port = 3000;

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectToDB(process.env.MONGO_URI);
		app.listen(port, console.log('server is listening 3000'));
	} catch (error) {
		console.log(error);
	}
};

start();
