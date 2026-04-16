import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./M3/components/Navbar";
import TicketListPage from "./M3/pages/TicketListPage";
import CreateTicketPage from "./M3/pages/CreateTicketPage";
import TicketDetailsPage from "./M3/pages/TicketDetailsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TicketListPage />} />
        <Route path="/tickets/create" element={<CreateTicketPage />} />
        <Route path="/tickets/:id" element={<TicketDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;