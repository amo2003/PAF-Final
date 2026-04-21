import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './M2/components/Navbar';
import ChatBot from './M2/components/ChatBot';
import Home from './pages/Home';
import BookingList from './M2/pages/BookingList';
import BookingForm from './M2/pages/BookingForm';
import BookingDetail from './M2/pages/BookingDetail';
import MyBookings from './M2/pages/MyBookings';
import AdminPanel from './M2/pages/AdminPanel';
import CheckIn from './M2/pages/CheckIn';
import Analytics from './M2/pages/Analytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* booking manamgnet */}
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/bookings/:id" element={<BookingDetail />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/checkin/:id" element={<CheckIn />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
