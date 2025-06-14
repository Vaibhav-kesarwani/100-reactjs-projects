const mongoose = require('mongoose')

async function connectDB(uri) {
    try {
        await mongoose.connect(uri)
        console.log("✅ MongoDB connected");


    } catch (error) {
        console.error("❌ MongoDB connection error:", err.message); 
        return {error:'error to connect with your mongodb.'}
    }
    
}

module.exports={connectDB};
