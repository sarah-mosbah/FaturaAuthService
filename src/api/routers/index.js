import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {router as userRouter} from './users.routes.js';
import * as subscriber from '../../amqp/subscriber.js';
export function index(app) {
  return new Promise((resolve, reject) => {
    app.use(bodyParser.json());
    app.use(cors({ origin: true, credentials: true }));
    app.use(cookieParser());
    subscriber.sendEmailConsumer();
    app.use('/api/users', userRouter);
    resolve();
  });

};
