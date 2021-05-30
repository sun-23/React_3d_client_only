import '../CSS/preview.css'
import { useState } from "react";
import {ScaleLoader} from 'react-spinners';
import STLViewer from '../Component/STLViewer';
import Select_material from '../Component/Select_material'
import Select_infill from '../Component/Select_infill'
import Slider_modelsize from '../Component/Slider_modelsize'
import NodeStl from "../stl" ;
var Buffer = require("buffer/").Buffer;

function Preview() {
  const [stl_file, setFile] = useState();
  const [stl_cal, setSTL_Cal] = useState();
  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState(1.27);
  const [infill, setInfill] = useState(40);
  const [size, setSize] = useState(100);
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

  const changeModelSize = (e) => {
    setSize(e.target.value)
  }

  return (
    <div className="preview">
      <div className="preview_detail">
        <h2>Preview 3d stl model</h2>
        <input
          className="btn-file"
          type="file"
          name="name"
          onChange={(e) => selectFile(e)}
        ></input>
        <input className="btn-submit" type="submit" onClick={submitStl}></input>
        <div className="mat_infill">
          <Select_material onChangeMaterial={changeMaterial} />
          <Select_infill onChangeInfill={changeInfill} />
        </div>
        <Slider_modelsize size={size} onChangeSize={changeModelSize} />
        <p>Material density: {material} g/cm^3</p>

        {show ? <div>
          {stl_cal ? <div>
              <h3>Result</h3>
              <p>price: {price}</p>
              <p>volume: {stl_cal.volume} cm^3</p>
              <p>W: {stl_cal.boundingBox[1] / 10 } cm</p>
              <p>D: {stl_cal.boundingBox[0] / 10 } cm</p>
              <p>H: {stl_cal.boundingBox[2] / 10 } cm</p>
            </div> : <div style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ScaleLoader
                color={'#123abc'}
                loading={true}/>
          </div>}
          </div> : 
        <p>{message}</p> }
      </div>
      <div className="preview_model">
        {show ? <STLViewer
          onSceneRendered={(element) => {
              console.log(element)
          }}
          sceneClassName="test-scene"
          file={stl_file}
          className="obj"
          modelColor="#185adb"
          backgroundColor="#f0f0f0"/>
        : null }
      </div>
    </div>
  );
}

export default Preview;