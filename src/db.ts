// Import the Mongoose library for MongoDB connection
import mongoose from 'mongoose';

// Define an asynchronous function to connect to MongoDB
async function connect() {
  try {
    // Retrieve the MongoDB URI from environment variables
    const uri = process.env.MONGO_URI as string;  

    // Attempt to connect to MongoDB using the provided URI
    await mongoose.connect(uri);

    console.log('Connected to MongoDB!');
  } catch (error) {
    // Throw the error
    throw new Error('Error connecting to MongoDB: ' + error);
  }
}

// Event listener for MongoDB connection errors
mongoose.connection.on('error', err => {
  console.log('DB connection error:', err);
})

// Export the connect function
export { connect };