import express from 'express';
import { classifyImage } from '../controllers/classifyController.js';

const router = express.Router();

router.post('/', classifyImage); // POST /classify

export default router;
// This code defines a route for classifying images. It imports the classifyImage function from the classifyController.js file and sets up a POST route at /classify that will call this function when a request is made to that endpoint. The router is then exported for use in other parts of the application.
