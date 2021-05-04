import { RequestHandler } from 'express';
import { groupModel as Group, Group_Base_Schema_Options, Group_Schema_Options } from '../models';

export interface Update_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = { main: Group_Base_Schema_Options },
    ReqQuery = { groupId: string, author: string },
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const Update: Update_RequestHandler = (req, res, next) => {
    try {
        const { main } = req.body;
        Group.findOne({ groupId: req.query.groupId }, {}, {}, (err, doc) => {
            if (err) throw err;
            if (!doc) throw 'No document was found.';
            doc.updateOne({ main, $push: { archive: (doc as Group_Schema_Options).main } }, {}, (err, result) => {
                if (err) throw err;
                res.status(201).json({ result });
            });
        });
    }
    catch (err) {
        res.status(500).json({ err });
    }
};

export default Update;