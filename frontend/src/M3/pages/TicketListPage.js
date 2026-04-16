import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ticketService from "../services/ticketService";

function TicketListPage() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await ticketService.getAllTickets();
      setTickets(response.data);
    } catch (err) {
      setError("Failed to load tickets");
    }
  };

  return (
    <div className="page-container">
      <h1>All Tickets</h1>
      {error && <p className="error-text">{error}</p>}

      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <Link to={`/tickets/${ticket.id}`} key={ticket.id} className="ticket-card">
            <h3>{ticket.title}</h3>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Category:</strong> {ticket.category}</p>
            <p><strong>Location:</strong> {ticket.resourceLocation}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TicketListPage;