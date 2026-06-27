

const Lead = require('../models/Lead');


exports.getLeads = async (req, res) => {
  try {
    const { search, status, unitType, sortBy } = req.query;
    let query = {};

   
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }


    if (status && status !== 'All') {
      query.status = status;
    }


    if (unitType && unitType !== 'All') {
      query.unitType = unitType;
    }

  
    const sortOrder = sortBy === 'oldest' ? 1 : -1;

    const leads = await Lead.find(query).sort({ createdAt: sortOrder });
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {

    res.status(400).json({ success: false, message: error.message });
  }
};


exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // 
      runValidators: true, 
    });
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getStats = async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const statuses = ['New', 'Contacted', 'Site Visit Scheduled', 'Closed', 'Lost'];

    const counts = {};
    for (const status of statuses) {
      counts[status] = await Lead.countDocuments({ status });
    }

    res.status(200).json({ success: true, data: { total, ...counts } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
