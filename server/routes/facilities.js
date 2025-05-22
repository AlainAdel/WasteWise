
import express from 'express';
import { getMatchingFacilities } from '../controllers/facilitiesController.js';

const router = express.Router();

router.get('/facilities', getMatchingFacilities);

export default router;