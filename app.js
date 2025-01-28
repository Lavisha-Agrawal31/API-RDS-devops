const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection configuration
const dbConfig = {
    host: "nodeapidb.cdhkcbdix0dn.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "Lavi2004",
    database: "nodeapidb"
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Define a route to fetch data
app.get('/fetch-data', (req, res) => {
    const query = 'SELECT * FROM Details'; // Replace 'your_table' with your actual table name
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});