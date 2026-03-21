import { useState } from 'react';
import { fetchTrackingData } from '../api/trackingApi';

export const useTracking = () => {
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = async (trackingId, courierCode) => {
        setLoading(true);
        setError(null);
        setTrackingData(null);
        try {
            const data = await fetchTrackingData(trackingId, courierCode);
            setTrackingData(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch tracking info. Please check your ID and courier.');
        } finally {
            setLoading(false);
        }
    };

    return { trackingData, loading, error, search };
};