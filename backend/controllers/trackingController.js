export const getTrackingData = async (req, res) => {
    try {
        const { tracking_number, courier_code } = req.body;
        if (!tracking_number || !courier_code) {
            return res.status(400).json({
                success: false,
                message: 'trackingId and courierCode are required',
            })
        }
        let response = await fetch(`https://api.trackingmore.com/v4/trackings/create`, {
            method: 'POST',
            headers: {
                'Tracking-Api-Key': process.env.TRACKING_API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ tracking_number: tracking_number, courier_code: courier_code })
        })
        let result = await response.json();
        if ([4016, 4101].includes(result.meta.code)) {
            const getResponse = await fetch(`https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${tracking_number}&courier_code=${courier_code}`, {
                method: 'GET',
                headers: {
                    'Tracking-Api-Key': process.env.TRACKING_API_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            result = await getResponse.json();
        }
        const rawData = Array.isArray(result.data) ? result.data[0] : result.data;

        if (![200, 201].includes(result.meta.code) || !rawData?.tracking_number) {
            return res.status(404).json({ success: false, message: 'Shipment not found' });
        }

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

        return res.status(200).json(normalizedData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}