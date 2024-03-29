import { config, logging } from '@config';
import express from 'express';
import mongoose from 'mongoose';
import { articleRouter } from './article';
import { groupRouter } from './group';
const router = express.Router();

const NAMESPACE = 'Server-Router';
mongoose.set('useFindAndModify', false);
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(result => { logging.info(NAMESPACE, 'Mongo Connected'); })
    .catch(error => { logging.error(NAMESPACE, error.message, error); });


router.use('/article', articleRouter);
router.use('/group', groupRouter);

export default router;