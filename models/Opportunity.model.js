// models/Opportunity.js
const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  opportunityName: { type: String, required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  stage: { type: String, enum: ['Prospecting', 'Negotiation', 'Closed-Won', 'Closed-Lost'], required: true },
  amount: { type: Number, required: true },
  probability: { type: Number, required: true },
  closeDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  modifiedDate: { type: Date },
  notes: { type: String },
  tags: [String],
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number
    }
  ]
});

const Opportunity = mongoose.model('Opportunity', OpportunitySchema);

module.exports = Opportunity;
