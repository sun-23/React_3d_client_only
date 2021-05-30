import { useState } from "react";
import STLViewer from '../Component/STLViewer';
import Select_material from '../Component/Select_material'
import Select_infill from '../Component/Select_infill'
import NodeStl from "../stl" ;
var Buffer = require("buffer/").Buffer;

function Preview() {
  const [stl_file, setFile] = useState();
  const [stl_cal, setSTL_Cal] = useState();
  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState(1.27);
  const [infill, setInfill] = useState(40);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('please click submit button');

  const selectFile = (e) => {
    var file = e.target.files[0];
    if(file && file.name.toLocaleLowerCase().endsWith('.stl')){
      setShow(false);
      setSTL_Cal(null);
      setFile(file);
    } else {
      alert(' Invalid file type. Only STL files are supported. Please select a new file. ');
    }
  }

  const submitStl = async () => {
    setShow(false);
    setSTL_Cal(null);
    if(stl_file){
      setMessage('calculating...');
      console.log(stl_file);
      setShow(true)
      stl_file.arrayBuffer().then((arrayBuffer) => {
        var buffer = Buffer.from(arrayBuffer);
        var stl = new NodeStl(buffer, {density: material});
        console.log(stl);
        setSTL_Cal(stl)
        calculatingPrice(stl);
      });
    } else {
      alert('Please select file');
    }
  }

  const calculatingPrice  = (stl_cal) => {
    setPrice((50 + stl_cal.weight * (infill / 100) * 10) < 100 ? 100 : (50 + stl_cal.weight * (infill / 100) * 10));
  }

  const changeMaterial = (e) => {
    console.log('click', e.target.value);
    setMaterial(parseFloat(e.target.value));
    setSTL_Cal(null);
    setShow(false)
    setMessage('please click submit button');
  }

  const changeInfill = (e) => {
    console.log('click', e.target.value);
    setInfill(parseFloat(e.target.value));
    setSTL_Cal(null);
    setShow(false)
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
        <h3>W: {stl_cal.boundingBox[1] / 10 } cm</h3>
        <h3>D: {stl_cal.boundingBox[0] / 10 } cm</h3>
        <h3>H: {stl_cal.boundingBox[2] / 10 } cm</h3>
      </div> : <p>{message}</p>}
      {show ? <STLViewer
          onSceneRendered={(element) => {
              console.log(element)
          }}
          sceneClassName="test-scene"
          file={stl_file}
          className="obj"
          modelColor="#185adb"
          backgroundColor="#fafafa"/>
      : null }
    </div>
  );
}

export default Preview;