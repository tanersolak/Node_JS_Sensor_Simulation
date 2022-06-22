import React from "react";
import './App.css';
import { useState, useEffect, } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {


  const [sensorcount, setSensorCount] = useState(0)
  const [origin, setOrigin] = useState("")
  const [yaricap, setYaricap] = useState(0)
  const [delay, setDelay] = useState(0)
  const [type, setType] = useState("")
  const [location, setLocation] = useState("")
  const navigate = useNavigate();


  const [formFields, setFormFields] = useState([
    { type: '', location: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    const location = origin.split(".");

    if (location.length != 2) {
      alert("Geçerli bir origin noktası giriniz!!!")
      return 0;
    }

    for (let i = 0, len = formFields.length; i < len; i++){
      let Konum = formFields[i].location.split(".");
      if (yaricap<((parseInt(location[0])-parseInt(Konum[0]))**2+(parseInt(location[1])-parseInt(Konum[1]))**2)**(1/2)){
        alert("Bazı sensörlerin konumu haritanın yarıçapından çok uzak!!!")
        console.log("Bazı sensörlerin konumu haritanın yarıçapından çok uzak!!!")
        return 0;
      }
    }


    Axios.post("http://localhost:3001/postMap", {
      origin: origin,
      yaricap: yaricap,

    });
    for (let i = 0, len = formFields.length; i < len; i++) {
      if (delay <= 0) {
        delay = 1
      }
      Axios.post("http://localhost:3001/postSensors", {
        type: formFields[i].type,
        location: formFields[i].location,
        delay: delay,  //delay
      })
    }
    navigate("/about");
  }

  const addFields = () => {
    let object = {
      type: '',
      location: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }



  return (



    <div class="px-5 background h-100">
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
      
      <div class="mt-5 w-50 m-auto">
        <form onSubmit={submit} action="/">
        <h3>Harita</h3>
            <input
              class="form-control mb-2"
              type="number"
              required
              placeholder="Harita Merkez Noktası"
              onChange={(event) => {
                setOrigin(event.target.value)
              }}></input>

              <input
              class="form-control mb-2"
              type="number"
              required
              placeholder="Harita Yarıçapı"
              onChange={(event) => {
                setYaricap(event.target.value)
              }}></input>

              <input
              class="form-control mb-2"
              type="number"
              required
              placeholder="Sinyal Süresi"
              onChange={(event) => {
                setDelay(event.target.value)
              }}
              ></input>
              <h3>Sensörler</h3>
          {formFields.map((form, index) => {
            return (<div key={index}>
              <select class="custom-select form-control" name='type' required onChange={event => handleFormChange(event, index)} value={form.type}>
                <option >Bir Sensör Seçiniz</option>
                <option >LDR</option>
                <option >Gaz</option>
                <option >Sıcaklık</option>
                <option >Mesafe</option>
                <option >Yağmur</option>
                <option >Basınç</option>
                <option >Ses</option>
              </select>
              <br/>
              <input
                class="form-control my-2"
                name='location'
                type="number"
                placeholder='Sensör Konumu'
                required
                onChange={event => handleFormChange(event, index)}
                value={form.location}
              />
              <button class="btn indigo mb-2" onClick={() => removeFields(index)}>Remove</button>
            </div>
            )
          })}
          <button class="btn indigo " type="button" onClick={addFields}>Add More..</button> <br />
          <button class="btn indigo mt-2" onClick={submit} type="submit"> Submit</button>
        </form>
        
        <br />



      </div>

    </div>

  );
}

export default Home;