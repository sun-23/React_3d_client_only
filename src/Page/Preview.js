import { useState } from "react";
import {ScaleLoader} from 'react-spinners';
import STLViewer from '../Component/STLViewer';
import Select_material from '../Component/Select_material'
import Select_infill from '../Component/Select_infill'
import Slider_modelsize from '../Component/Slider_modelsize'
import Select_Quanlity from '../Component/Select_Quality'
import NodeStl from "../stl" ;
var Buffer = require("buffer/").Buffer;

function Preview() {
  const [stl_file, setFile] = useState();
  const [stl_cal, setSTL_Cal] = useState();
  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState(1.27);
  const [infill, setInfill] = useState(40);
  const [size, setSize] = useState(100);
  const [quality, setQuality] = useState(1);
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
    const x = (50 + stl_cal.weight * (infill / 100) * (size / 100) * (size / 100) * (size / 100) * 10) < 100 ? 100 : (50 + stl_cal.weight * (infill / 100) * (size / 100) * (size / 100) * (size / 100) * 10);
    const price = x * quality;
    console.log(price);
    setPrice(price);
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
    console.log('click', e.target.value);
    setSize(e.target.value)
    setSTL_Cal(null);
    setShow(false)
    setMessage('please click submit button');
  }

  const changeQuanlity = (e) => {
    console.log('click', e.target.value);
    setQuality(e.target.value)
    setSTL_Cal(null);
    setShow(false)
    setMessage('please click submit button');
  }

  return (
    <div className="d-flex justify-content-center container m-5">
      <div>
        {show ? <STLViewer
          onSceneRendered={(element) => {
              console.log(element)
          }}
          sceneClassName="test-scene"
          file={stl_file}
          className="obj"
          modelColor="#185adb"
          backgroundColor="#f0f0f0"
          scale={(size/100)}/>
        : <div className="rounded" style={{width: "400px" , height: "400px", backgroundColor: "gray"}}>
        </div> }
      </div>
      <div className="form-control">
        <h2>Preview 3d stl model</h2>
        <div className="row input-group mb-3">
          <div className="col">
            <input
              className="form-control"
              type="file"
              name="name"
              onChange={(e) => selectFile(e)}
            ></input>
          </div>
          <div className="col">
            <input className="btn btn-primary" type="submit" onClick={submitStl}></input>
          </div>
        </div>
        <div>
          <Select_material onChangeMaterial={changeMaterial} />
          <Select_infill onChangeInfill={changeInfill} />
          <Select_Quanlity onChangeQuality={changeQuanlity}/>
          <Slider_modelsize size={size} onChangeSize={changeModelSize} />
          <p>Material density: {material} g/cm^3</p>
          {show ? <div>
            {stl_cal ? <div>
                <h3>Result</h3>
                <p>price: {price}</p>
                <p>volume: {stl_cal.volume * (size / 100) * (size / 100) * (size / 100)} cm^3</p>
                <p>W: {stl_cal.boundingBox[1] / 10 * size / 100 } cm</p>
                <p>D: {stl_cal.boundingBox[0] / 10 * size / 100} cm</p>
                <p>H: {stl_cal.boundingBox[2] / 10 * size / 100} cm</p>
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
          <p className="alert alert-danger">{message}!</p>}
        </div>
      </div>
    </div>
  );
}

export default Preview;