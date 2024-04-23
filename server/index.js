const express = require('express');
const mongoose = require('mongoose')

const cors = require('cors');
const port = 3000

const userRoutes = require('./Routes/userRoutes');
const userData = require('./Routes/userData');

console.log(userRoutes);
mongoose.connect('mongodb+srv://kashishjangid:kashishjangid123@cluster0.mbxux9e.mongodb.net/Authentication', {
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

app.use(express.json())

// Set up CORS  
app.use(cors())

app.get('/', async (req, res) => {
    res.send('Welcome to my world...')
});

app.use(userRoutes);
app.use(userData);

// Get port from environment and store in Express.

const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});


