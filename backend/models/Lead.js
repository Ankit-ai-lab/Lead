  const mongoose = require('mongoose');

  const leadSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'], 
      trim: true, 
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'], 
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    property: {
      type: String, trim: true,
      default: '', 
    },
    unitType: {
      type: String,
      required: [true, 'Unit type is required'],
      enum: ['2 BHK', '3 BHK', 'Villa'], 
    },
    budget: {
      type: String, 
      required: [true, 'Budget is required'],
    },
    source: {
      type: String,
      enum: ['Website', 'Facebook', 'Referral', 'Walk-in'],
      default: 'Website', 
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['New', 'Contacted', 'Site Visit Scheduled', 'Closed', 'Lost'],
      default: 'New',
    },
    notes: {
      type: String,
      default: '',
    },
    followUpDate: {
      type: Date, 
      default: null,
    },
  }, {
    timestamps: true, 
  });

  module.exports = mongoose.model('Lead', leadSchema); 