import React, { useEffect, useState } from 'react';
import { getAllBookings, approveBooking, rejectBooking } from '../api/bookingApi';
import StatusBadge from '../components/StatusBadge';

function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPending = () => {
    setLoading(true);
    getAllBookings('PENDING')
      .then(setBookings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async (id) => {
    setActionLoading(true);
    try { await approveBooking(id); fetchPending(); }
    catch (e) { alert(e.message); }
    finally { setActionLoading(false); }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) return alert('Please enter a rejection reason.');
    setActionLoading(true);
    try {
      await rejectBooking(rejectModal, rejectReason);
      setRejectModal(null);
      setRejectReason('');
      fetchPending();
    } catch (e) { alert(e.message); }
    finally { setActionLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
      <p className="text-gray-500 mb-8">Review and manage pending booking requests.</p>

      {loading && <p className="text-gray-400 text-center py-12">Loading...</p>}
      {error && <p className="text-red-500 text-center py-12">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🎉</p>
          <p className="text-gray-500">No pending bookings. All caught up!</p>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl shadow-sm p-6 border border-yellow-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-800">Booking #{b.id}</span>
                <StatusBadge status={b.status} />
              </div>
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>📧 {b.userEmail}</p>
                <p>🏢 Resource ID: {b.resourceId}</p>
                <p>📅 {b.bookingDate} &nbsp; ⏰ {b.startTime} – {b.endTime}</p>
                <p>👥 Attendees: {b.attendees}</p>
                <p>📝 {b.purpose}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleApprove(b.id)} disabled={actionLoading}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition disabled:opacity-50">
                  ✓ Approve
                </button>
                <button onClick={() => { setRejectModal(b.id); setRejectReason(''); }} disabled={actionLoading}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50">
                  ✗ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {rejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Reject Booking #{rejectModal}</h2>
            <textarea rows={3} placeholder="Enter rejection reason..."
              value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={handleReject} disabled={actionLoading}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50">
                Confirm Reject
              </button>
              <button onClick={() => setRejectModal(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
