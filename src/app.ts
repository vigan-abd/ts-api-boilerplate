import * as express from 'express';
import * as createError from 'http-errors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import HttpsMiddleware from '@middlewares/HttpsMiddleware';
import CorsMiddleware from '@middlewares/CorsMiddleware';
import ErrorResponseMiddleware from '@middlewares/ErrorResponseMiddleware';


// APP SETUP
const app = express();
import config from '@config';
import container from '@containers/web';
import routes from '@routes';

// SECURITY CONFIG
app.set('trust proxy', 1);
app.use(CorsMiddleware);

// REQUEST CONFIG
app.set('json spaces', 2);
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json', limit: config.REQ_PAYLOAD_LIMIT }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (config.APP_ENV === 'production') {
  app.use(HttpsMiddleware);
}

// ROUTE CONFIG
app.use(routes.web(container));
app.use(routes.api(container));

// EVENT CONFIG
routes.event(container);

// JOBS CONFIG
routes.jobs(container);

// SOCKET CONFIG
routes.socket(container);

// 404 ERROR HANDLER
app.use((req, res, next) => {
  next(createError(404));
});

// ERROR HANDLER
// This middleware is injected vi Awilix because in future it may adapt to different environments
const errorMiddleware: ErrorResponseMiddleware = container.resolve('ErrorResponseMiddleware');
app.use(errorMiddleware.handler);

app.on('close', () => container.dispose());

export default app;
export const _container = container;