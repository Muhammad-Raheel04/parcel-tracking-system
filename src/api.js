const TRACKINGMORE_BASE_URL = 'https://api.trackingmore.com/v4';
const TRACKINGMORE_API_KEY = 'zgwd9uu8-o15f-h75u-t0ce-llx5m97dnsaq'; 

export const fetchCouriers = async () => {
  try {
    const response = await fetch(`${TRACKINGMORE_BASE_URL}/couriers/all`, {
      method: 'GET',
      headers: {
        'Tracking-Api-Key': TRACKINGMORE_API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching couriers:', error);
    throw error;
  }
};

export const fetchTrackingData = async (trackingId, courierCode) => {
  const cacheKey = `tracking_${trackingId}_${courierCode}`;
  
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < 3600000) {
      
      return data;
    }
  }

  try {
 
    
    const response = await fetch(`${TRACKINGMORE_BASE_URL}/trackings/create`, {
      method: 'POST',
      headers: {
        'Tracking-Api-Key': TRACKINGMORE_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        tracking_number: trackingId,
        courier_code: courierCode,
      }),
    });

    let result = await response.json();
   
    if (result.meta.code === 4016 || result.meta.code === 4101) {
      
      const getResponse = await fetch(`${TRACKINGMORE_BASE_URL}/trackings/get?tracking_numbers=${trackingId}&courier_code=${courierCode}`, {
        method: 'GET',
        headers: {
          'Tracking-Api-Key': TRACKINGMORE_API_KEY,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      result = await getResponse.json();
     
    }

    const rawData = Array.isArray(result.data) ? result.data[0] : result.data;

    if ((result.meta.code === 200 || result.meta.code === 201) && rawData?.tracking_number) {
      const normalizedData = {
        trackingNumber: rawData.tracking_number,
        courierCode: rawData.courier_code,
        status: rawData.delivery_status || 'Pending',
        estimateDeliveryTime: rawData.scheduled_delivery_date || 'N/A',
        originCountry: rawData.origin_country || 'N/A',
        destinationCountry: rawData.destination_country || 'N/A',
        lastEvent: rawData.latest_event || 'No updates yet',
        events: (rawData.origin_info?.trackinfo || []).map(event => ({
          statusDescription: event.tracking_detail,
          eventTime: event.checkpoint_date,
          address: event.location || '',
          details: event.checkpoint_delivery_status || ''
        }))
      };

      localStorage.setItem(cacheKey, JSON.stringify({
        data: normalizedData,
        timestamp: Date.now(),
      }));

      return normalizedData;
    } else {
      throw new Error('Shipment not found');
    }

  } catch (error) {
    console.error('Error in fetchTrackingData:', error);
    throw error;
  }
};
