const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');



const app = express();
const PORT = 3000;
app.use(cors())

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to serve static files (optional, if you want to serve a frontend)
app.use(express.static('public'));

// Log visit to a file
app.post('/logVisit', (req, res) => {
    const { timestamp,action, route, agent } = req.body;

    const logMessage = `Timestamp: ${timestamp},Visit: ${action}, Route: ${route}, User Agent: ${agent}\n`;

    fs.appendFile(path.join(__dirname, 'logs', 'visits.log'), logMessage, (err) => {
        if (err) {
            console.error('Error logging visit:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Visit logged:', logMessage);
        res.status(200).send('Visit logged');
    });
});

// Log events to a file
app.post('/logEvent', (req, res) => {
    const { timestamp,action, productId, agent } = req.body;

    const logMessage = `Timestamp: ${timestamp},Event: ${action}, Product ID: ${productId}, User Agent: ${agent}\n`;

    fs.appendFile(path.join(__dirname, 'logs', 'events.log'), logMessage, (err) => {
        if (err) {
            console.error('Error logging event:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Event logged:', logMessage);
        res.status(200).send('Event logged');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
