import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import couriersRoute from './routes/couriersRoute.js'
import trackingRoute from './routes/trackingRoute.js'

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use('/api/v1/couriers',couriersRoute)
app.use('/api/v1/trackings',trackingRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`visit http://localhost:${PORT}`);
})