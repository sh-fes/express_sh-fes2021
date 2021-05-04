import { RequestHandler } from 'express';
import { groupModel as Group, Group_Base_Schema_Options } from '../models';

export interface Create_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = { main: Group_Base_Schema_Options, groupId: string, groupTag: string },
    ReqQuery = {},
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const Create: Create_RequestHandler = (req, res, next) => {
    try {
        const { groupId, groupTag, main } = req.body;
        const group = new Group({ groupId, groupTag, main, archive: [] });
        group
            .save()
            .then(result => { res.status(201).json({ result }); })
            .catch(err => { throw err });
    }
    catch (err) {
        res.status(500).json({ err });
    }
};

export default Create;