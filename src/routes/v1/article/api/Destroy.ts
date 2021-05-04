import { RequestHandler } from 'express';
import { articleModel as Article } from '../models';

export interface Destroy_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = {},
    ReqQuery = {},
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const Destroy: Destroy_RequestHandler = (req, res, next) => {
    try {
        Article.remove({}, err => {
            if (err) throw err;
            res.status(201).json({ message: 'Destroyed All' });
        });
    }
    catch (err) {
        res.status(500).json({ err });
    }
};

export default Destroy;