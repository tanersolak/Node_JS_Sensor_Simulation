import './App.css';
import {useState, useEffect } from "react";
import Axios from "axios";
import Home from "./Home"
import About from "./About"
import SensorDetails from "./SensorDetails"
import {Route,Link, Routes} from "react-router-dom"
import Form from './Form';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/about' element={<About/>}/>

        <Route path='/about/:id' element={<SensorDetails/>}/>

      </Routes>
      
          
    </div>
  );
}

export default App;
