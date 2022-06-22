import React from "react";
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function About() {


  const [ListofSensors, setListofSensors] = useState([]);
  
  const deleteSensor = (id, e)=>{
    e.preventDefault();
    Axios.delete(`http://localhost:3001/${id}`,)
    .then(res=>{
      Axios.get("http://localhost:3001/getSensors").then((res)=>{
      setListofSensors(res.data)
      alert("Silindi!!!")
    });
  }).catch(err=>console.log(err))
    
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getSensors").then((response) => {
      setListofSensors(response.data)
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
      <table class="table table-bordered bg-light">
        <thead>
          <tr>
            <th scope="col">Sensör Türü</th>
            <th scope="col">Sensör Konumu</th>
            <th scope="col">Sensör Raporlama Sıklığı</th>
            <th scope="col">Aksiyonlar</th>
          </tr>
        </thead>
        {ListofSensors.map((sensor) => {
          return (

            <tbody >
              <tr >

                <td>{sensor.type}</td>
                <td>{sensor.location}</td>
                <td>{sensor.delay/1000}</td>
                <td><button class="btn btn-danger rounded mr-1" onClick={(e)=>deleteSensor(sensor._id, e)} >Sil</button>
                    <Link to={`/about/${sensor._id}`}><button class="btn btn-primary rounded ml-1">Görüntüle</button></Link></td>
              </tr>
            </tbody>


          );
        })}

      </table>

    </div>
  );
}

export default About;