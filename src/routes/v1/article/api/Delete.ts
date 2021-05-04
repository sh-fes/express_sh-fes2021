import { RequestHandler } from 'express';
import { articleModel as Article, ArticleSchema } from '../models';

export interface Delete_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = {},
    ReqQuery = { articleId: string, author: string },
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const Delete: Delete_RequestHandler = (req, res, next) => {
    try {
        Article.findOne({ articleId: req.query.articleId }, {}, {}, (err, doc) => {
            if (err) throw err;
            if (!doc) throw 'No document was found.';
            doc.updateOne({ main: { display: null, seo: null, author: req.query.author }, $push: { archive: (doc as ArticleSchema).main } }, {}, (err, result) => {
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