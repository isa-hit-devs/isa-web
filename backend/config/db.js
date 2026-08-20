const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
    console.log('Connecting to database...');    
    await mongoose.connect(process.env.MONGO_URI)
    console.log('database connected');
} catch(error) {
    console.log('Failed to connect to database:', error);
    process.exit(1);
}
}

module.exports = connectDB;