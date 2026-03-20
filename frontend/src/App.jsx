import React, { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import TrackingForm from './components/TrackingForm'
import TrackingResult from './components/TrackingResult'
import TrackingHistory from './components/TrackingHistory'
import Footer from './components/Footer'
import { fetchTrackingData } from './api'


const App = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  // Scroll to results when they are loaded or an error occurs
  useEffect(() => {
    if ((trackingData || error) && !loading) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [trackingData, error, loading]);

  const handleSearch = async (trackingId, courierCode) => {
    console.log('Search initiated for:', trackingId, courierCode);
    setLoading(true);
    setError(null);
    setTrackingData(null);
    
    try {
      const data = await fetchTrackingData(trackingId, courierCode);
      console.log('Search successful, data received:', data);
      setTrackingData(data);
    } catch (err) {
      console.error('Search failed:', err);
      setError(err.message || 'Failed to fetch tracking information. Please check your ID and courier.');
    } finally {
      setLoading(false);
      console.log('Search completed, loading set to false');
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-50/50'>
      <Navbar />
      
      <main className='flex-grow'>
        <div className="container mx-auto px-4">
          <TrackingForm onSearch={handleSearch} loading={loading} />
          
          {/* Results Section */}
          <div className="mt-12" ref={resultsRef}>
            {loading || error || trackingData ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TrackingResult data={trackingData} loading={loading} error={error} />
                {trackingData && trackingData.events && trackingData.events.length > 0 && (
                  <TrackingHistory events={trackingData.events} />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
