import { RequestHandler } from 'express';
import { groupModel as Group } from '../models';

export interface Query_RequestHandler<
    P = {},
    ResBody = {},
    ReqBody = { query: object[] },
    ReqQuery = {},
    Locals extends Record<string, any> = {}
    > extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> { }

const Query: Query_RequestHandler = (req, res, next) => {
    try {
        if (!req.body.query) throw `Please specify 'req.body.query'`;
        /** `aggregate`              {https://mongoosejs.com/docs/api/model.html#model_Model.aggregate}
         *  'aggregate(`pipeline`)'  {https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/} */
        Group
            .aggregate(req.body.query)
            .exec((err, result) => {
                if (err) throw err;
                else return res.status(200).json({ ...result });
            });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export default Query;
