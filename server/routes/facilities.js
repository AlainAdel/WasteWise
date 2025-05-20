import express from 'express';
import { getFacilities } from '../controllers/facilitiesController.js';

const router = express.Router();

router.get('/', getFacilities); // GET /facilities?type=plastic&zip=10001

export default router;