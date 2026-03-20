import { getCouriers } from "../controllers/couriersController.js";
import express from 'express';
const router=express.Router()

router.get('/',getCouriers);

export default router;