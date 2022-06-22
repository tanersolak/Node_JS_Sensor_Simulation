const SensorModel = require('./models/sensors.js');

class SensorData {

    constructor(id, interval, data) {
        this.id = id;
        this.interval = interval;
        this.data = data;
    }

    async addSensorData()  {
        

        const newData =[Math.floor((Math.random() * 50).toFixed(1)) + 10,Math.floor((Math.random() * 50).toFixed(1)) + 10,Math.floor((Math.random() * 50).toFixed(1)) + 10,Math.floor((Math.random() * 50).toFixed(1)) + 10,Math.floor((Math.random() * 50).toFixed(1)) + 10]
        this.data.push(newData)
        const filter = { _id: this.id };
        const update = { data: this.data };

        const updated = await SensorModel.findOneAndUpdate(filter, { $set: update })
        console.log(updated)
        setTimeout(() => {
            
                this.addSensorData();
            
        }, this.interval);
    }


 
}

module.exports = SensorData;