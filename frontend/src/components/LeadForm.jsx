// src/components/LeadForm.jsx
// One reusable form for BOTH "Add Lead" and "Edit Lead" - avoids duplicate code.
// If initialData is passed in, it's edit mode. Otherwise, it's add mode.

import { useState } from 'react';

const emptyLead = {
  name: '',
  email: '',
  phone: '',
  property: '',
  unitType: '2 BHK',
  budget: '',
  source: 'Website',
  status: 'New',
  notes: '',
  followUpDate: '',
};

function LeadForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || emptyLead);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!form.unitType) newErrors.unitType = 'Unit type is required.';
    if (!form.budget.trim()) newErrors.budget = 'Budget is required.';
    if (!form.status) newErrors.status = 'Status is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone Number</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Interested Property</label>
          <input name="property" value={form.property} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Unit Type</label>
          <select name="unitType" value={form.unitType} onChange={handleChange}>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="Villa">Villa</option>
          </select>
          {errors.unitType && <span className="field-error">{errors.unitType}</span>}
        </div>
        <div className="form-group">
          <label>Budget</label>
          <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. 75 Lakhs" />
          {errors.budget && <span className="field-error">{errors.budget}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Lead Source</label>
          <select name="source" value={form.source} onChange={handleChange}>
            <option value="Website">Website</option>
            <option value="Facebook">Facebook</option>
            <option value="Referral">Referral</option>
            <option value="Walk-in">Walk-in</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Closed">Closed</option>
            <option value="Lost">Lost</option>
          </select>
          {errors.status && <span className="field-error">{errors.status}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Follow-up Date (bonus)</label>
          <input type="date" name="followUpDate" value={form.followUpDate?.slice(0,10) || ''} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">{initialData ? 'Update Lead' : 'Add Lead'}</button>
      </div>
    </form>
  );
}

export default LeadForm;
