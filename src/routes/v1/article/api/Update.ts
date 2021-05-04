import { RequestHandler } from 'express';
import { articleModel as Article, Article_Base_Schema_Options, Article_Schema_Options } from '../models';

export interface Update_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = { main: Article_Base_Schema_Options },
    ReqQuery = { articleId: string, author: string },
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const Update: Update_RequestHandler = (req, res, next) => {
    try {
        const { main } = req.body;
        Article.findOne({ articleId: req.query.articleId }, {}, {}, (err, doc) => {
            if (err) throw err;
            if (!doc) throw 'No document was found.';
            doc.updateOne({ main, $push: { archive: (doc as Article_Schema_Options).main } }, {}, (err, result) => {
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