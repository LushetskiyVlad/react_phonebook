import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config.json';

import contactsRouter from './api/routes/contacts';
import userRouter from './api/routes/user';

const app = express();

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/contacts', contactsRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

const server = app.listen(config.serverPort, () => {
	console.log('Server is up and running on port ' + config.serverPort);
});