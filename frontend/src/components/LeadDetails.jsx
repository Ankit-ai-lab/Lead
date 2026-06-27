function LeadDetails({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>Lead Details</h3>
        <div className="details-grid">
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone}</p>
          <p><strong>Property:</strong> {lead.property || '-'}</p>
          <p><strong>Unit Type:</strong> {lead.unitType}</p>
          <p><strong>Budget:</strong> {lead.budget}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <p><strong>Status:</strong> <span className="status-pill">{lead.status}</span></p>
          <p><strong>Follow-up Date:</strong> {lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : 'Not set'}</p>
          <p><strong>Created:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
          <p className="full-width"><strong>Notes:</strong> {lead.notes || 'No notes added.'}</p>
        </div>
        <button className="btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LeadDetails;
