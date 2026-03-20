import 'dotenv/config';
import express from 'express';

const app=express();
app.use('/',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Server running",
    })
})

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT);
    console.log(`visit http://localhost:${process.env.PORT}`);
})