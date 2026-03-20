import express from 'express';
import { getTrackingData } from '../controllers/trackingController.js';

const router=express.Router();

router.post('/',getTrackingData)

export default router;