const BASE_URL=import.meta.env.VITE_API_BASE_URL;

export const fetchCouriers=async()=>{
   const res=await fetch(`${BASE_URL}/api/v1/couriers`);
   if(!res.ok){
    throw new Error("Failed to fetch couriers");
   }
   const {data}=await res.json();
   return data;
}