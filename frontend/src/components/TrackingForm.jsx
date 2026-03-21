import { Search, Loader2, Package } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fetchCouriers } from '../api'
import { useCouriers } from '../hooks/useCouriers';

const TrackingForm = ({ onSearch, loading }) => {
    const {couriers, loading:fetchingCouriers,error:couriersError} = useCouriers();
    const [trackingId, setTrackingId] = useState("");
    const [courier, setCourier] = useState("");

    useEffect(() => {
        if(couriers.length===0){
            return;
        }
        const defaultCourier=couriers.find(c=>c.courier_code==='pakistan-post');
        setCourier(defaultCourier?.courier_code?? couriers[0].courier_code);
    }, [couriers]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!trackingId || !courier) return;
        onSearch(trackingId, courier);
    };

    return (
        <div className="flex justify-center mt-10 px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

                <div className="flex justify-center items-center gap-2 text-center bg-blue-50 p-2 rounded-3xl mb-6 ring-8 ring-blue-50/50">
                    <Package className="text-blue-500 w-16 h-16" />
                    <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">Track Your Parcel</h2>
                </div>


                <p className="text-gray-500 text-center mb-8 px-8">
                    <span className='text-blue-500'>Enter</span> your <span className='text-blue-500'>tracking number</span> and <span className='text-blue-500'>select</span> a <span className='text-blue-500'>courier</span> to get real-time updates.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 px-4">
                    <div className="space-y-2">

                        <div className="relative group">
                            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={20} />
                            <input
                                type="text"
                                placeholder="e.g. 1Z999AA10123456784"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                className="pl-12 w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">

                        <div className="relative">
                            <select
                                value={courier}
                                onChange={(e) => setCourier(e.target.value)}
                                className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm bg-white appearance-none cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
                                disabled={fetchingCouriers}
                                required
                            >
                               {fetchingCouriers?(
                                <option>Loading couriers...</option>
                               ):couriersError?(
                               <option>Failed to load couriers</option>
                            ):(couriers.map((c)=>(
                                <option key={c?.courier_code} value={c?.courier_code}>
                                    {c?.courier_name}
                                </option>
                            )))}
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || fetchingCouriers}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 mb-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Tracking...</span>
                            </>
                        ) : (
                            'Track Parcel'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TrackingForm;
