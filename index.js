const express = require("express");
const app = express();
const mongoose = require('mongoose');
const SensorModel = require('./models/sensors.js');
const MapModel = require('./models/map.js')
const SensorData = require('./sensorData.js');


const cors = require("cors");
app.use(cors());

app.use(express.json());

mongoose.connect("SERVER LINK");

const port = process.env.PORT || 3001;


app.get("/getSensors", (req, res) => {

    SensorModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });

});

app.delete("/:SensorId", async (req,res)=>{
    try {
        const removedSensor = await SensorModel.remove({ _id: req.params.SensorId })
        res.json(removedSensor);
    }
    catch (err) {
        res.json({ message: err });
    }
})


app.get("/getMap", (req, res) => {

    MapModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });

});
app.post("/postMap", async (req, res) => {
    const map = new MapModel({
        origin: req.body.origin,
        yaricap: req.body.yaricap

    });

    map.save()
        .then(data => {
            res.json(data);

        })
        .catch(err => {
            res.json({ message: err });

        })
});


app.post("/postSensors", async (req, res) => {
    const sensor = new SensorModel({
        type: req.body.type,
        location: req.body.location,
        delay: req.body.delay*1000
    });

    const savedSensor = await sensor.save()
        
            const test = new SensorData(savedSensor._id,savedSensor.delay,savedSensor.data)
            await test.addSensorData()
            res.json("veri eklendi");

     
       
});




app.get("/about/:id", async (req, res) => {

        SensorModel.findById(req.params.id, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(port + " portta çalışıyor");
});
