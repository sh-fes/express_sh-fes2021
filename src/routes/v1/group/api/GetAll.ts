import { RequestHandler } from 'express';
import { groupModel as Group } from '../models';

export interface GetAll_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = {},
    ReqQuery = {},
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const GetAll: GetAll_RequestHandler = (req, res, next) => {
    try {
        Group.find((err, docs) => {
            if (err) throw err;
            res.status(201).json({ docs });
        });
    }
    catch (err) {
        res.status(500).json({ err });
    }
};

export default GetAll;