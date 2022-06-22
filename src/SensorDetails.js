import { useParams } from "react-router-dom"
import React from "react";
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function SensorDetails() {


    const { id } = useParams();
    const [type, setType] = useState("")
    const [location, setlocation] = useState("")
    const [delay, setdelay] = useState("")
    const [data, setdata] = useState("")
    
  
    const [ListofSensors, setListofSensors] = useState([]);
  
    useEffect(() => {
      Axios.get(`http://localhost:3001/about/${id}`).then((response) => {
        setType(response.data.type);
        setlocation(response.data.location);
        setdelay(response.data.delay)
        setdata(response.data.data)

      });
    }, [])

  return (
    <div class="px-5 background">
       <nav class="navbar navbar-expand">
        <a class="navbar-brand text-indigo" href="http://localhost:3000/">SensorTracker</a>
        <div class="navbar" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active ">
              <a class="nav-link text-indigo" href="/about">All Sensors </a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="card  mb-3 w-50 m-auto">
        <div class="card-header">Sensör Bilgileri</div>
        <div class="card-body ">
          <h5 class="card-title">{ type } Sensörü</h5>
          <p class="card-text">Konum: { location }</p>
          <p class="card-text">Gecikme: { delay/1000 } Saniye </p>
          {/* {data.map(element => <p class="card-text">{ element }</p>)} */}
        </div>
      </div>
    </div>
  );
}

export default SensorDetails;