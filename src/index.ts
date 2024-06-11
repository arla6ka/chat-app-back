import express from 'express';
import { config } from 'dotenv';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';


config();


const app = express();
app.use(express.json());
app.use(logger);
connectDB();
app.use('/api', globalRouter);


app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
