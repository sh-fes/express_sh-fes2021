import { RequestHandler } from 'express';
import { groupModel as Group, Group_Schema_Options } from '../models';

export interface Delete_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = {},
    ReqQuery = { groupId: string, author: string },
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const Delete: Delete_RequestHandler = (req, res, next) => {
    try {
        Group.findOne({ groupId: req.query.groupId }, {}, {}, (err, doc) => {
            if (err) throw err;
            if (!doc) throw 'No document was found.';
            doc.updateOne({ main: { display: null, seo: null, author: req.query.author }, $push: { archive: (doc as Group_Schema_Options).main } }, {}, (err, result) => {
                if (err) throw err;
                res.status(201).json({ result });
            });
        });
    }
    catch (err) {
        res.status(500).json({ err });
    }
};

export default Delete;