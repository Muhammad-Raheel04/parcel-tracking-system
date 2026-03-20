import React from 'react';
import { Circle, CheckCircle2, MapPin, Clock } from 'lucide-react';

const TrackingHistory = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 pb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          Tracking History
        </h3>

        <div className="relative space-y-8">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

          {events.map((event, index) => {
            const isLatest = index === 0;
            return (
              <div key={index} className="relative pl-10">
                <div className="absolute left-0 top-1.5 z-10 bg-white">
                  {isLatest ? (
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 fill-white" />
                  )}
                </div>

                <div className={`p-4 rounded-xl border transition-all ${
                  isLatest 
                    ? 'bg-blue-50/50 border-blue-100 ring-1 ring-blue-100' 
                    : 'bg-white border-gray-50'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <p className={`font-bold ${isLatest ? 'text-blue-900' : 'text-gray-800'}`}>
                      {event.statusDescription || event.details}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{event.eventTime || event.time}</span>
                      </div>
                    </div>
                  </div>

                  {event.address && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.address}</span>
                    </div>
                  )}
                  
                  {event.details && event.statusDescription && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      {event.details}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackingHistory;
