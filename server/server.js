const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const createLogFilePath = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    const folderPath = path.join(__dirname, 'logs', `${year}${month}${day}${hour}`);
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, `${year}${month}${day}${hour}${minute}${second}.txt`);
    return filePath;
};

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

app.post('/logEvent', (req, res) => {
    const { timestamp, action, product, quantity, price, route, agent } = req.body;

    const formattedTimestamp = formatTimestamp(timestamp);

    const logMessage = `${formattedTimestamp}|${action}|${product}|${quantity}|${price}|${route}\n`;

    const filePath = createLogFilePath();

    fs.appendFile(filePath, logMessage, (err) => {
        if (err) {
            console.error('Error logging event:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Event logged:', logMessage);
        res.status(200).send('Event logged');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
