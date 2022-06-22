import React from "react";
import './App.css';
import {useState, useEffect } from "react";
import Axios from "axios";


function About(){

    const [ListofSensors, setListofSensors] = useState([]);
  
  useEffect(()=>{
    Axios.get("http://localhost:3001/getSensors").then((response)=>{
      setListofSensors(response.data)
    });
  }, [])

    return(
        <div className="sensorsDisplay">
          
        {ListofSensors.map((sensor)=>{
        return (
          <div>
            <table class="table table-striped">
            <thead>
    <tr>
      
      <th scope="col">Sensör Türü</th>
      <th scope="col">Sensör Konumu</th>
      <th scope="col">Sensör Raporlama Sıklığı</th>
      <th scope="col">Aksiyonlar</th>
    </tr>
    
  </thead>
  <tbody>
    <tr>
      
      <td>{sensor.type}</td>
      <td>{sensor.location}</td>
      <td>{sensor.delay}</td>
      <button class="btn btn-outline-danger " >Sil</button>
    </tr>
  </tbody>
</table>
            
          </div>
        );
      })}
      </div>
    );
}

export default About;