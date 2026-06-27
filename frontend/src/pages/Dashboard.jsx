
import { useState, useEffect } from 'react';
import { getLeads, createLead, updateLead, deleteLead, getStats } from '../services/api';
import SummaryCard from '../components/SummaryCard';
import LeadForm from '../components/LeadForm';
import LeadDetails from '../components/LeadDetails';

function Dashboard({ onLogout }) {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [unitFilter, setUnitFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch leads whenever search/filter/sort changes
  const fetchLeads = async () => {
    const params = { search, sortBy };
    if (statusFilter !== 'All') params.status = statusFilter;
    if (unitFilter !== 'All') params.unitType = unitFilter;
    const result = await getLeads(params);
    if (result.success) setLeads(result.data);
  };

  const fetchStats = async () => {
    const result = await getStats();
    if (result.success) setStats(result.data);
  };

  useEffect(() => {
    fetchLeads();
    fetchStats();
    // eslint-disable-next-line
  }, [search, statusFilter, unitFilter, sortBy]);

  const handleAddOrUpdate = async (formData) => {
    if (editingLead) {
      await updateLead(editingLead._id, formData);
    } else {
      await createLead(formData);
    }
    setShowForm(false);
    setEditingLead(null);
    fetchLeads();
    fetchStats();
  };

  const confirmDelete = async () => {
    await deleteLead(deleteTarget._id);
    setDeleteTarget(null);
    fetchLeads();
    fetchStats();
  };


  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Property', 'Unit Type', 'Budget', 'Status', 'Created Date'];
    const rows = leads.map((l) => [
      l.name, l.phone, l.email, l.property, l.unitType, l.budget, l.status,
      new Date(l.createdAt).toLocaleDateString(),
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leads_export.csv';
    link.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Real Estate Lead Dashboard</h2>
        <button className="btn-secondary" onClick={handleLogout}>Logout</button>
      </header>

      {/* Summary cards */}
      <div className="summary-grid">
        <SummaryCard label="Total Leads" count={stats.total || 0} color="#4f46e5" />
        <SummaryCard label="New" count={stats.New || 0} color="#0ea5e9" />
        <SummaryCard label="Contacted" count={stats.Contacted || 0} color="#f59e0b" />
        <SummaryCard label="Site Visit Scheduled" count={stats['Site Visit Scheduled'] || 0} color="#8b5cf6" />
        <SummaryCard label="Closed" count={stats.Closed || 0} color="#10b981" />
        <SummaryCard label="Lost" count={stats.Lost || 0} color="#ef4444" />
      </div>

      {/* Toolbar: search, filters, sort, add button, export */}
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Site Visit Scheduled">Site Visit Scheduled</option>
          <option value="Closed">Closed</option>
          <option value="Lost">Lost</option>
        </select>
        <select value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)}>
          <option value="All">All Unit Types</option>
          <option value="2 BHK">2 BHK</option>
          <option value="3 BHK">3 BHK</option>
          <option value="Villa">Villa</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <button className="btn-secondary" onClick={exportCSV}>Export CSV</button>
        <button className="btn-primary" onClick={() => { setEditingLead(null); setShowForm(true); }}>
          + Add Lead
        </button>
      </div>

      {/* Lead table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Lead Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Property</th>
              <th>Unit Type</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr><td colSpan="9" className="empty-row">No leads found.</td></tr>
            )}
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.email}</td>
                <td>{lead.property || '-'}</td>
                <td>{lead.unitType}</td>
                <td>{lead.budget}</td>
                <td><span className={`status-pill status-${lead.status.replace(/\s+/g, '-').toLowerCase()}`}>{lead.status}</span></td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <button className="link-btn" onClick={() => setViewingLead(lead)}>View</button>
                  <button className="link-btn" onClick={() => { setEditingLead(lead); setShowForm(true); }}>Edit</button>
                  <button className="link-btn danger" onClick={() => setDeleteTarget(lead)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit form modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>{editingLead ? 'Edit Lead' : 'Add New Lead'}</h3>
            <LeadForm
              initialData={editingLead}
              onSubmit={handleAddOrUpdate}
              onCancel={() => { setShowForm(false); setEditingLead(null); }}
            />
          </div>
        </div>
      )}

      {/* View details modal */}
      {viewingLead && <LeadDetails lead={viewingLead} onClose={() => setViewingLead(null)} />}

   
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal-card small" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to delete this lead?</p>
            <p className="delete-name">{deleteTarget.name}</p>
            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
