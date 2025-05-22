import express from 'express';
import { classifyImage } from '../controllers/classifyController.js';

const router = express.Router();

router.post('/', classifyImage);

export default router;