const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import cors package



const app = express();
const port = 5000;

app.use(cors()); // You can configure it to allow specific origins if needed

// Set up SQLite database
const db = new sqlite3.Database('./data.db', (err) => {
  if (err) {
    console.error('Could not open database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS form_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label1 TEXT NOT NULL,
    label2 TEXT NOT NULL
  )`
);

// Middleware
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { label1, label2 } = req.body;

  if (!label1 || !label2) {
    return res.status(400).json({ error: 'Both label1 and label2 are required' });
  }

  // Insert form data into SQLite
  const stmt = db.prepare('INSERT INTO form_data (label1, label2) VALUES (?, ?)');
  stmt.run([label1, label2], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert data' });
    }
    res.status(200).json({
      message: 'Data successfully saved!',
      id: this.lastID, // Return the inserted record ID
    });
  });
  stmt.finalize();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
