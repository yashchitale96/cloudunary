const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image:{
        type: String,
        require: true
    }
})


module.exports = mongoose.Model('Image', imageSchema);
