import { RequestHandler } from 'express';
import { articleModel as Article, Article_Base_Schema_Options } from '../models';

export interface Create_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = { main: Article_Base_Schema_Options, articleId: string, groupId: string, groupTag: string },
    ReqQuery = {},
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const Create: Create_RequestHandler = (req, res, next) => {
    try {
        const { articleId, groupId, groupTag, main } = req.body;
        const article = new Article({ articleId, groupId, groupTag, main, archive: [] });
        article
            .save()
            .then(result => { res.status(201).json({ result }); })
            .catch(err => { throw err });
    }
    catch (err) {
        res.status(500).json({ err });
    }
};

export default Create;