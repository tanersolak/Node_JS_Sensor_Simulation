const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    delay:{
        type:Number,
        required:true,
        default:"10"
    },
    date:{
        type:Date,
        default:Date.now,
    },
    data:{
        type:Array,
    }



});

const SensorModel = mongoose.model("sensors", SensorSchema)
module.exports = SensorModel;