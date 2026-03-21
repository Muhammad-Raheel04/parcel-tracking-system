export const getCouriers=async(req,res)=>{
     try {
        const response = await fetch(`https://api.trackingmore.com/v4/couriers/all`, {
            headers: {
                'Tracking-Api-Key': process.env.TRACKING_API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const data=await response.json();
        return res.status(200).json({
            success:true,
            message:"successfully fetched list of couriers",
            data:data.data,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}