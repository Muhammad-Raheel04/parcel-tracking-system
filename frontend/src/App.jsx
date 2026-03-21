import React, { useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import TrackingForm from './components/TrackingForm';
import TrackingResult from './components/TrackingResult';
import TrackingHistory from './components/TrackingHistory';
import Footer from './components/Footer';
import { useTracking } from './hooks/useTracking';

const App = () => {
  const { trackingData, loading, error, search } = useTracking();
  const resultsRef = useRef(null);

  useEffect(() => {
    if ((trackingData || error) && !loading) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [trackingData, error, loading]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <TrackingForm onSearch={search} loading={loading} />

          <div className="mt-12" ref={resultsRef}>
            {(loading || error || trackingData) && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TrackingResult data={trackingData} loading={loading} error={error} />
                {trackingData?.events?.length > 0 && (
                  <TrackingHistory events={trackingData.events} />
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;