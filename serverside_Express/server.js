const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');

const mongoose = require('mongoose');
const DB_URI = 'mongodb+srv://root:Qazwsx321@crudapp.vv0dkxv.mongodb.net/?retryWrites=true&w=majority&appName=crudapp';
mongoose.connect(DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('db connection error', err));

const { Client, Employee, Ticket, TBody } = require('./models');

const app = express();
const port = 5000;


//app.use(cors()); // You can configure it to allow specific origins if needed

// Middleware
app.use(bodyParser.json());

// Use the routes
//const router = require('./router'); 
//app.use('/api', router);
app.post('/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Server is running and APIs are live!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});