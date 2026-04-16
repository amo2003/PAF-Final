import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ticketService from "../services/ticketService";

function CreateTicketPage() {
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    category: "EQUIPMENT",
    priority: "HIGH",
    preferredContact: "",
    resourceLocation: "",
    createdBy: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ticketService.createTicket(ticket);
      navigate(`/tickets/${response.data.id}`);
    } catch (err) {
      setError("Failed to create ticket");
    }
  };

  return (
    <div className="page-container">
      <h1>Create Ticket</h1>
      {error && <p className="error-text">{error}</p>}

      <form className="ticket-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={ticket.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={ticket.description}
          onChange={handleChange}
        />

        <select
          name="category"
          value={ticket.category}
          onChange={handleChange}
        >
          <option value="ELECTRICAL">ELECTRICAL</option>
          <option value="NETWORK">NETWORK</option>
          <option value="EQUIPMENT">EQUIPMENT</option>
          <option value="FACILITY">FACILITY</option>
          <option value="OTHER">OTHER</option>
        </select>

        <select
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          type="text"
          name="preferredContact"
          placeholder="Preferred Contact"
          value={ticket.preferredContact}
          onChange={handleChange}
        />

        <input
          type="text"
          name="resourceLocation"
          placeholder="Resource / Location"
          value={ticket.resourceLocation}
          onChange={handleChange}
        />

        <input
          type="text"
          name="createdBy"
          placeholder="Created By"
          value={ticket.createdBy}
          onChange={handleChange}
        />

        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
}

export default CreateTicketPage;