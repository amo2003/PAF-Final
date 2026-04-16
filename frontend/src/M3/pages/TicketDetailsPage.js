import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ticketService from "../services/ticketService";

function TicketDetailsPage() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({
    userName: "",
    message: "",
  });
  const [technicianName, setTechnicianName] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTicket();
    fetchComments();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await ticketService.getTicketById(id);
      setTicket(response.data);
    } catch (err) {
      setError("Failed to load ticket");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await ticketService.getComments(id);
      setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const submitComment = async () => {
    try {
      await ticketService.addComment(id, commentData);
      setCommentData({ userName: "", message: "" });
      fetchComments();
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const changeStatus = async (status) => {
    try {
      await ticketService.updateStatus(id, status);
      fetchTicket();
    } catch (err) {
      setError("Failed to update status");
    }
  };

  const assignTechnicianAction = async () => {
    try {
      await ticketService.assignTechnician(id, { technicianName: technicianName });
      setTechnicianName("");
      fetchTicket();
    } catch (err) {
      setError("Failed to assign technician");
    }
  };

  const rejectTicketAction = async () => {
    try {
      await ticketService.rejectTicket(id, { reason: rejectReason });
      setRejectReason("");
      fetchTicket();
    } catch (err) {
      setError("Failed to reject ticket");
    }
  };

  const resolveTicketAction = async () => {
    try {
      await ticketService.resolveTicket(id, { resolutionNotes: resolutionNotes });
      setResolutionNotes("");
      fetchTicket();
    } catch (err) {
      setError("Failed to resolve ticket");
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await ticketService.uploadAttachment(id, formData);
      setSelectedFile(null);
      fetchTicket();
    } catch (err) {
      setError("Failed to upload attachment");
    }
  };

  if (!ticket) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <h1>{ticket.title}</h1>
      {error && <p className="error-text">{error}</p>}

      <div className="details-box">
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Category:</strong> {ticket.category}</p>
        <p><strong>Preferred Contact:</strong> {ticket.preferredContact}</p>
        <p><strong>Location:</strong> {ticket.resourceLocation}</p>
        <p><strong>Created By:</strong> {ticket.createdBy}</p>
        <p><strong>Assigned Technician:</strong> {ticket.assignedTechnician || "Not Assigned"}</p>
        <p><strong>Resolution Notes:</strong> {ticket.resolutionNotes || "-"}</p>
        <p><strong>Rejection Reason:</strong> {ticket.rejectionReason || "-"}</p>
      </div>

      <div className="action-box">
        <h3>Update Status</h3>
        <button onClick={() => changeStatus("IN_PROGRESS")}>Mark IN_PROGRESS</button>
        <button onClick={() => changeStatus("CLOSED")}>Mark CLOSED</button>
      </div>

      <div className="action-box">
        <h3>Assign Technician</h3>
        <input
          type="text"
          placeholder="Technician Name"
          value={technicianName}
          onChange={(e) => setTechnicianName(e.target.value)}
        />
        <button onClick={assignTechnicianAction}>Assign</button>
      </div>

      <div className="action-box">
        <h3>Resolve Ticket</h3>
        <textarea
          placeholder="Resolution Notes"
          value={resolutionNotes}
          onChange={(e) => setResolutionNotes(e.target.value)}
        />
        <button onClick={resolveTicketAction}>Resolve</button>
      </div>

      <div className="action-box">
        <h3>Reject Ticket</h3>
        <textarea
          placeholder="Reject Reason"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
        <button onClick={rejectTicketAction}>Reject</button>
      </div>

      <div className="action-box">
        <h3>Upload Attachment</h3>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload</button>
      </div>

      <div className="action-box">
        <h3>Add Comment</h3>
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={commentData.userName}
          onChange={handleCommentChange}
        />
        <textarea
          name="message"
          placeholder="Comment"
          value={commentData.message}
          onChange={handleCommentChange}
        />
        <button onClick={submitComment}>Add Comment</button>
      </div>

      <div className="action-box">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p><strong>{comment.userName}</strong></p>
              <p>{comment.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TicketDetailsPage;