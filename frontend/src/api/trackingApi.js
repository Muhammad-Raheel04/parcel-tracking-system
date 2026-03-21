const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCouriers = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/couriers`);
    if (!res.ok) {
        throw new Error("Failed to fetch couriers");
    }
    const { data } = await res.json();
    return data;
}

export const fetchTrackingData = async (trackingId, courierCode) => {
    const res = await fetch(`${BASE_URL}/api/v1/trackings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tracking_number: trackingId,
            courier_code: courierCode,
        })
    })
    const result = await res.json();

    if(!res.ok){
        throw new Error(result.message || 'Shipment not found');
    }

    return result;
}