import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookingsByUser } from '../api/bookingApi';
import StatusBadge from '../components/StatusBadge';

function MyBookings() {
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    setError('');
    setSearched(true);
    try { setBookings(await getBookingsByUser(userId)); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
      <p className="text-gray-500 mb-8">Enter your User ID to view your bookings.</p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="number" placeholder="Enter User ID" value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-48"
        />
        <button type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
          Search
        </button>
      </form>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && searched && bookings.length === 0 && (
        <p className="text-gray-400">No bookings found for this user.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-800">Booking #{b.id}</span>
                <StatusBadge status={b.status} />
              </div>
              <p className="text-sm text-gray-500 mb-1">📅 {b.bookingDate} &nbsp; ⏰ {b.startTime} – {b.endTime}</p>
              <p className="text-sm text-gray-500 mb-1">🏢 Resource: {b.resourceId}</p>
              <p className="text-sm text-gray-500 mb-3 truncate">📝 {b.purpose}</p>
              {b.rejectionReason && <p className="text-xs text-red-500 mb-3">Reason: {b.rejectionReason}</p>}
              <Link to={`/bookings/${b.id}`} className="text-indigo-600 text-xs hover:underline">View Details →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
