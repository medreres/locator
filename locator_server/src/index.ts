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

app.get('/', (req, res) => { res.send('Hello world') })

// spin up 
app.listen(process.env.PORT || 3173, () => { console.log('server listening on port ' + (process.env.PORT || 3000)) });