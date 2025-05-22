import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import classifyRouter from './routes/classify.js';
import facilitiesRouter from './routes/facilities.js';
import testRoute from './routes/testRoute.js';



const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // or 20mb if needed

app.get('/', (req, res) => res.send('API Running'));

app.use('/classify', classifyRouter);
app.use('/facilities', facilitiesRouter);

app.use('/api', testRoute);

app.use('/api', facilitiesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));