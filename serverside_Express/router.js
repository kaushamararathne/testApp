// routes.js
const express = require('express');
const router = express.Router();

const { Client, Employee, Ticket, TBody } = require('./models');

/** ======================
 * Client APIs
 ======================= */
// Create client
router.post('/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all clients
router.get('/clients', async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

/** ======================
 * Employee APIs
 ======================= */
// Create employee
router.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all employees
router.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

/** ======================
 * Ticket APIs
 ======================= */
// Create ticket
router.post('/tickets', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tickets (with populated client and employee info)
router.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find()
    .populate('clientId', 'fname lname email')
    .populate('employeeId', 'name email empType');
  res.json(tickets);
});

/** ======================
 * TBody (Ticket Notes) APIs
 ======================= */
// Create a note
router.post('/notes', async (req, res) => {
  try {
    const note = new TBody(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get notes for a ticket
router.get('/tickets/:ticketId/notes', async (req, res) => {
  const notes = await TBody.find({ ticketId: req.params.ticketId });
  res.json(notes);
});

module.exports = router;
