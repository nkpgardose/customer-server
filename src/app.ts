import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/api-routes';

export default function app() {
	const app = express();

	/**
	 * Middleware implementation:
	 */
	app.use(helmet());
	app.use(compression());
	app.use(cors());
	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	/**
	 * API Routes
	 */
	app.use('/api', apiRoutes);

	/**
	 * Server listening on PORT:
	 */
	const PORT = 3000;
	app.listen(PORT, () => {
		console.log('Running on port:', PORT);
	});
}
