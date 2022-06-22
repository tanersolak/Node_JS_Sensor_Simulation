const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
    origin:{
        type:String,
        required:true,
    },
    yaricap:{
        type:String,
        required:true,
    }
    
});

const MapModel = mongoose.model("map", MapSchema)
module.exports = MapModel;