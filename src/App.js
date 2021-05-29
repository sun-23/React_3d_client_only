import "./styles.css";
import React, { useState } from "react";
import NodeStl from "./stl" ;
var Buffer = require("buffer/").Buffer;

export default function App() {
  const [stl_file, setFile] = useState();
  const [stl_cal, setSTL_Cal] = useState();
  const [material, setMaterial] = useState(1.38);
  const [message, setMessage] = useState('please click submit button');

  const submitStl = () => {
    setSTL_Cal(null);
    setMessage('calculating...')
    console.log("calculating.... with material density", material);
    stl_file.arrayBuffer().then(async (arrayBuffer) => {
      console.log("arrayBuffer ", arrayBuffer);
      const len = await arrayBuffer.byteLength;
      console.log("len ", len);
      var buffer = Buffer.from(arrayBuffer);
      console.log("readUInt32le(80) ", buffer.readInt32LE(80));
      var stl = new NodeStl(buffer, {density: material});
      setSTL_Cal(stl)
      console.log(stl);
    });
  }

  const changeMaterial = (e) => {
    console.log('click', e.target.value);
    setMaterial(parseFloat(e.target.value));
    setSTL_Cal(null);
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        type="file"
        name="name"
        onChange={async (e) => {
          var file = e.target.files[0];
          console.log(file);
          setFile(file);
        }}
      ></input>
      <input type="submit" onClick={submitStl}></input>
        <label for="cars">  Material: </label>
        <select name="Material" onChange={(e) => changeMaterial(e)}>
          <option value="1.38">PETG</option>
          <option value="1.24">PLA</option>
        </select>
        <p>Material density: {material} g/cm^3</p>
      {stl_cal ? <div>
        <h2>Calculator</h2>
        <h3>volume: {stl_cal.volume} cm^3</h3>
        <h3>boundingBox: {stl_cal.boundingBox[0]} {stl_cal.boundingBox[1]} {stl_cal.boundingBox[2]} mm</h3>
        <h3>weight: {stl_cal.weight} gm</h3>
        <h3>area: {stl_cal.area} m^2</h3>
        <h3>center of mass: {stl_cal.centerOfMass[0]} {stl_cal.centerOfMass[1]} {stl_cal.centerOfMass[2]} mm</h3>
      </div> : <p>{message}</p>}
    </div>
  );
}
