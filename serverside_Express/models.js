// models.js
const mongoose = require('mongoose');

// Client Schema
const clientSchema = new mongoose.Schema({
  fname: { type: String, required: true },         // First name, required
  lname: { type: String, required: true },         // Last name, required
  age: { type: Number },                           // Age (optional)
  occupation: { type: String },                    // Occupation (optional)
  branch: { type: String },                        // Branch (optional)
  email: { type: String, required: true, unique: true }, // Email, required & unique
  contactNumber: { type: String, required: true }  // Contact number, required
});


// Employee Schema
const employeeSchema = new mongoose.Schema({
  refid: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  empType: { 
    type: String, 
    enum: ['ADMIN', 'SUPERVISOR', 'L1ENGINEER', 'L2L3ENGINEER', 'L4ENGINEER'], 
    required: true 
  }
});

// Ticket Schema
const ticketSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  status: { type: String, default: 'Open' },
  ticketHead: { type: String, required: true },
  ticketBody: { type: String, required: true }
});

// TBody Schema (Ticket Notes)
const tbodySchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  note: { type: String, required: true }
});

// Export Models
const Client = mongoose.model('Client', clientSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);
const TBody = mongoose.model('TBody', tbodySchema);

module.exports = { Client, Employee, Ticket, TBody };
