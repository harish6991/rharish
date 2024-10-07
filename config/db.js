const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const uri = `mongodb://${process.env.ENVIRONMENT}:27017/${process.env.MONGO_DATABASE}`;
    console.log(uri)
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB database:', mongoose.connection.name);
    return mongoose.connection;
  } catch (error) {

    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};


module.exports = connectToDatabase;
