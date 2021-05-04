import express from 'express';
import { Aggregate, Create, Delete, Destroy, GetAll, Update } from './api';

const router = express.Router();

router.get('/', GetAll); /** ***DANGER*** Only for Debug */
router.post('/create', Create);
router.get('/query', Aggregate);
router.get('/delete', Delete);
router.get('/destroy', Destroy); /** ***DANGER*** Only for Debug */
router.post('/update', Update);

export { router as articleRouter };

