const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async(req,res) =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to DB')
    }
    catch(err){
        res.status(400).json({success:false, message:err.message})
    }
}

module.exports = connectDB;