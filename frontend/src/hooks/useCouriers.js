import { useEffect, useState } from "react"
import { fetchCouriers } from "../api/trackingApi.js";

export const useCouriers=()=>{
    const [couriers,setCouriers]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const load=async()=>{
            setLoading(true);
            try{
                const data=await fetchCouriers();
                setCouriers(data);
            }catch(error){
                setError(error.message ||'Failed to load couriers');
            }finally{
                setLoading(false);
            }
        }
        load();
    },[])

    return {couriers,loading,error};
}