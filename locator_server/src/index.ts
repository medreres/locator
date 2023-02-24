import express from 'express';
import dotenv from 'dotenv'
import locationRouter from './routes/location';
import cors from 'cors'
// arrange
const app = express();
app.use(cors({ credentials: true, origin: true }))
dotenv.config();

// routes
app.use(locationRouter);

// spin up 
const PORT = process.env.PORT || 3173;
app.listen(PORT, () => { console.log('server listening on port ' + PORT) });