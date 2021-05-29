import { useState } from "react";
import STLViewer from '../Component/STLViewer';
import Select_material from '../Component/Select_material'
import Select_infill from '../Component/Select_infill'
import NodeStl from "../stl" ;
var Buffer = require("buffer/").Buffer;

function Preview() {
  const [stl_file, setFile] = useState();
  const [stl_cal, setSTL_Cal] = useState();
  const [material, setMaterial] = useState(1.27);
  const [infill, setInfill] = useState(20);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('please click submit button');

  const selectFile = (e) => {
    var file = e.target.files[0];
    if(file.name.toLocaleLowerCase().endsWith('.stl')){
      setFile(file);
    } else {
      alert(' Invalid file type. Only STL files are supported. Please select a new file. ');
    }
  }

  const submitStl = () => {
    setSTL_Cal(null);
    setMessage('calculating...')
    stl_file.arrayBuffer().then(async (arrayBuffer) => {
      console.log("arrayBuffer ", arrayBuffer);
      const len = await arrayBuffer.byteLength;
      console.log("len ", len);
      var buffer = Buffer.from(arrayBuffer);
      console.log("readUInt32le(80) ", buffer.readInt32LE(80));
      var stl = new NodeStl(buffer, {density: material});
      setSTL_Cal(stl)
      console.log(stl);
      calculatingPrice(stl);
    });
  }

  const calculatingPrice  = (stl_cal) => {
    setPrice((50 + stl_cal.weight * (infill / 100) * 10) < 100 ? 100 : (50 + stl_cal.weight * (infill / 100) * 10));
  }

  const changeMaterial = (e) => {
    console.log('click', e.target.value);
    setMaterial(parseFloat(e.target.value));
    setSTL_Cal(null);
    setMessage('please click submit button');
  }

  const changeInfill = (e) => {
    console.log('click', e.target.value);
    setInfill(parseFloat(e.target.value));
    setSTL_Cal(null);
    setMessage('please click submit button');
  }

  return (
    <div className="App">
      <h2>Preview 3d stl model</h2>
      <input
        type="file"
        name="name"
        onChange={(e) => selectFile(e)}
      ></input>
      <input type="submit" onClick={submitStl}></input>
      <Select_material onChangeMaterial={changeMaterial} />
      <Select_infill onChangeInfill={changeInfill} />
      <p>Material density: {material} g/cm^3</p>

      {stl_cal ? <div className="Model_Preview">
        <h2>Result</h2>
        <h3>price: {price}</h3>
        <h3>volume: {stl_cal.volume} cm^3</h3>
        {/* <h3>boundingBox: {stl_cal.boundingBox[0]} {stl_cal.boundingBox[1]} {stl_cal.boundingBox[2]} mm</h3>
        <h3>weight not include infill: {stl_cal.weight} gm</h3> 
        <h3>area: {stl_cal.area} m^2</h3>
        <h3>center of mass: {stl_cal.centerOfMass[0]} {stl_cal.centerOfMass[1]} {stl_cal.centerOfMass[2]} mm</h3> */}
        <STLViewer
          onSceneRendered={(element) => {
              console.log(element)
          }}
          sceneClassName="test-scene"
          file={stl_file}
          className="obj"
          modelColor="#185adb"
          backgroundColor="#fafafa"/>
      </div> : <p>{message}</p>}

    </div>
  );
}

export default Preview;