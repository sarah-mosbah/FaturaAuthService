import bodyParser from 'body-parser';
import cors from 'cors';
import {router as userRouter} from './users.routes.js';
import {router as transactionRouter} from './transfere.routes.js';
export function index(app) {
  return new Promise((resolve, reject) => {
    app.use(bodyParser.json());
    app.use(cors({ origin: true, credentials: true }));
    app.use('/api/users', userRouter);
    app.use('/api/transfere', transactionRouter);
    resolve();
  });

};
