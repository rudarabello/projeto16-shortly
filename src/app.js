import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/routes.js';
dotenv.config();

const PORT = process.env.PORT
const app = express(); 
app.use(express.json(), cors());
app.use(route);

app.listen(PORT, console.log(`Running on ${PORT}`));