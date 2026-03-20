import 'dotenv/config';
import express from 'express';

const app=express();

const PORT=process.env.PORT;
app.use('/',(req,res)=>{
    return res.status(200).json({
        success:"true",
        message:"server is running",
    })
})
app.listen(PORT,()=>{
    console.log(`visit http://localhost:3200`);
})