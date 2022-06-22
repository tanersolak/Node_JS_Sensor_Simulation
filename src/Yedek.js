import React from "react";
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";


function Home() {
  const [ListofSensors, setListofSensors] = useState([0]);

  const [sensorcount, setSensorCount] = useState(0)
  const [origin, setOrigin] = useState("")
  const [yaricap, setYaricap] = useState(0)
  const [delay, setDelay] = useState(0)


  const [type, setType] = useState("")
  const [location, setLocation] = useState("")




const CreateMap=()=>{
  Axios.post("http://localhost:3001/postMap", {
    origin:origin,
    yaricap:yaricap,

  });

}

  const CreateSensor = () => {
    Axios.post("http://localhost:3001/postSensors", {
      type: type,
      location: location,
      delay: 10,  //delay

    }).then((response) => {
      setListofSensors([...ListofSensors,
      {
        type: type,
        location: location,
        delay: 10,//delay

      }])
    });
  };


  const handleFormChange = (event, index )=>{
    let data = [...ListofSensors];
    data[index][event.target.type]= event.target.value;
    setListofSensors(data);
  }
  const submit = ()=>{

  }
  const addFields = ()=>{
    let object = {
      type: type,
      location: location,
    }
    setListofSensors([...ListofSensors,object])
  }

  return (


    <div class="mt-5 w-50 m-auto">
      
      <div>
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Harita Merkez Noktası"
          onChange={(event) => {
            setOrigin(event.target.value)
          }}></input>

        <input
          class="form-control mb-2"
          type="text"
          placeholder="Harita Yarıçapı"
          onChange={(event) => {
            setYaricap(event.target.value)
          }}></input>

        {/* <input
          class="form-control mb-2"
          type="text"
          placeholder="Sensör Sayısı"
          onChange={(event) => {
            setSensorCount(event.target.value)
          }}></input> */}

        <input
          class="form-control mb-2"
          type="text"
          placeholder="Sinyal Süresi"
          onChange={(event) => {
            setDelay(event.target.value)
          }}
        ></input>

        <button class="btn btn-outline-primary" onClick={CreateMap}> Harita Oluştur</button>

      </div>

      <div>
      <form>
      {ListofSensors.map((form, index) => {
          return (
            <div key={index}>
              <input
                class="form-control mb-2"
                type="text"
                placeholder="Sensör Tipi"
                onChange={(event) => {
                  setType(event.target.value)}}
              ></input>

              <input
                class="form-control mb-2"
                type="text"
                placeholder="Sensör Konumu"
                onChange={(event) => {
                  setLocation(event.target.value)}}
              ></input>
            </div>
          )
        })}
      </form>
      <button class="btn btn-outline-primary" onClick={CreateSensor}> Sensör Oluştur</button>

      </div>

    </div>

  );
}

export default Home;