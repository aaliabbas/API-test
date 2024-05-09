// index.js

const mongoose = require('mongoose');
const State = require('./models/States'); // Import the State model
const fs = require('fs').promises; // Use the fs.promises module to work with files asynchronously

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');

  try {
    // Read states.json file
    const data = await fs.readFile('states.json', 'utf-8');
    const statesData = JSON.parse(data); // Parse JSON data
    
    // Insert data into MongoDB collection
    await State.insertMany(statesData);
    
    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    mongoose.connection.close(); // Close MongoDB connection
  }
})
.catch(err => console.error('Error connecting to MongoDB:', err));
