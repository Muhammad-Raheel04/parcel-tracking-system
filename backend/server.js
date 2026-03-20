import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import couriersRoute from './routes/couriersRoute.js'
const app = express();

const PORT = process.env.PORT;
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use('/api/v1/couriers',couriersRoute)
app.listen(PORT, () => {
    console.log(`visit http://localhost:3200`);
})