import React from 'react';
import { Package, Truck, MapPin, Calendar, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const TrackingResult = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-gray-500 font-medium">Fetching shipment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 border border-red-100 rounded-xl flex items-center gap-4 text-red-700">
        <AlertCircle className="w-6 h-6 flex-shrink-0" />
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4 py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No data available for this tracking number.</p>
      </div>
    );
  }

  const { trackingNumber, courierCode, originCountry, destinationCountry, status, lastEvent, estimateDeliveryTime } = data;

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes('delivered')) return 'text-green-600 bg-green-50 border-green-100';
    if (s?.includes('transit') || s?.includes('pickup') || s?.includes('out for delivery')) return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    if (s?.includes('exception') || s?.includes('failed') || s?.includes('expired')) return 'text-red-600 bg-red-50 border-red-100';
    return 'text-blue-600 bg-blue-50 border-blue-100';
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes('delivered')) return <CheckCircle2 className="w-5 h-5" />;
    if (s?.includes('transit')) return <Truck className="w-5 h-5" />;
    return <Package className="w-5 h-5" />;
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Tracking ID</p>
              <h2 className="text-2xl font-bold text-gray-800">{trackingNumber}</h2>
            </div>
            <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-semibold ${getStatusColor(status)}`}>
              {getStatusIcon(status)}
              <span className="capitalize">{status || 'Unknown'}</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">Carrier</span>
            </div>
            <p className="font-semibold text-gray-700">{courierCode?.toUpperCase()}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">Origin</span>
            </div>
            <p className="font-semibold text-gray-700">{originCountry || 'N/A'}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">Destination</span>
            </div>
            <p className="font-semibold text-gray-700">{destinationCountry || 'N/A'}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">Est. Delivery</span>
            </div>
            <p className="font-semibold text-gray-700">{estimateDeliveryTime || 'Pending'}</p>
          </div>
        </div>

        {/* Latest Status */}
        {lastEvent && (
          <div className="px-6 pb-6">
            <div className="bg-blue-50/30 rounded-xl p-4 border border-blue-50">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Latest Update</p>
                  <p className="text-gray-600 mt-1">{lastEvent}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingResult;
