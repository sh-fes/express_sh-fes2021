import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import createHttpError from 'http-errors';
import logger from 'morgan';
import { HttpException } from './exceptions/HttpException';
import { v1 as router } from './routes';

const app = express();
const NAMESPACE = 'Server';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);

app.use((req, res, next) => { next(createHttpError(404)); });

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send('error');
});

const debug = Debug('express:server');
const port = process.env.PORT || 4000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
    const address = server.address();
    debug(`Listening on ${address}`)
});