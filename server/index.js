const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000
require('dotenv').config()
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb+srv://kashishjangid:kashishjangid123@cluster0.mbxux9e.mongodb.net/SkillVibe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Setup Express App
const app = express();

// Middleware
app.use(bodyParser.json());

// Set up CORS  
app.use(cors())

app.get('/', async (req, res) => {
    res.send('Welcome to my world...')
});

// Get port from environment and store in Express.

const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});


// Connect to MongoDB
// const DATABASE_URL = process.env.DB_URL || 'mongodb+srv://kashishjangid:kashishjangid123@cluster0.mbxux9e.mongodb.net/'
// const DATABASE = process.env.DB || 'Authentication'

// db(DATABASE_URL, DATABASE);