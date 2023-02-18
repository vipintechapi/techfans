const mongoose = require('mongoose');

// Set up a MongoDB database connection using Mongoose
async function connectToDatabase() {
    try {
        await mongoose.set("strictQuery", false)
            .connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToDatabase;
