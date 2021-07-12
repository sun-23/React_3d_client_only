import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase/firebase"
import { v4 as uuidv4 } from 'uuid';
import { ScaleLoader } from 'react-spinners';
import { Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import STLViewer from '../Component/STLViewer';
import Select_material from '../Component/Select_material'
import Select_infill from '../Component/Select_infill'
import Slider_modelsize from '../Component/Slider_modelsize'
import Select_Quanlity from '../Component/Select_Quality'
import NodeStl from "../stl" ;
var Buffer = require("buffer/").Buffer;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function Preview() {
  const [stl_file, setFile] = useState();
  const [stl_url, setFileUrl] = useState("");
  const [stl_cal, setSTL_Cal] = useState();
  const [show, setShow] = useState(false);
  const [disBtn, setDisBtn] = useState(false);
  const [material, setMaterial] = useState(1.27);
  const [infill, setInfill] = useState(40);
  const [size, setSize] = useState(100);
  const [quality, setQuality] = useState(1);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('please click submit button');
  const [uploadmessage, setUpMessage] = useState('');
  const { currentUser, listFileOrder, listFileCart } = useAuth();
  const { height, width } = useWindowDimensions();
  const history = useHistory()

  const selectFile = (e) => {
    var file = e.target.files[0];
    if(file && file.name.toLocaleLowerCase().endsWith('.stl')){
      setShow(false);
      setSTL_Cal(null);
      setFile(file);
      setPrice(0);
      setMessage('Please click submit button');
    } else {
      alert(' Invalid file type. Only STL files are supported. Please select a new file. ');
    }
  }

  const submitStl = async () => {
    setShow(false);
    setSTL_Cal(null);
    var canUpload = await checkUpload();
    if(stl_file){
      setDisBtn(true);
      //console.log('can upload', canUpload);
      if(currentUser && canUpload){
        setShow(true)
        await stl_file.arrayBuffer().then(async (arrayBuffer) => {
          var buffer = Buffer.from(arrayBuffer);
          var stl = new NodeStl(buffer, {density: material});
          //console.log(stl);
          setSTL_Cal(stl)
          calculatingPrice(stl);
          await uploadfile(buffer);
          setDisBtn(false);
        });
      } else if (currentUser){
        setUpMessage('Cannot upload file that contains in cart or order. If you add to cart it used the current file from sever.');
        const storageRef = storage.ref();
        await storageRef.child('users_files/'+ currentUser.uid + "/" + stl_file.name)
              .getDownloadURL().then((url) => {
          //console.log("get url", url);
          setFileUrl(url);

          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = async (event) => {
            var blob = xhr.response;
            var file = new File([blob], stl_file.name);
            //console.log('crrrent file', file)
            setFile(file);
            setShow(true);
            await file.arrayBuffer().then(async (arrayBuffer) => {
              var buffer = Buffer.from(arrayBuffer);
              var stl = new NodeStl(buffer, {density: material});
              //console.log(stl);
              setSTL_Cal(stl);
              calculatingPrice(stl);
              setDisBtn(false);
            });
          };
          xhr.open('GET', url);
          xhr.send();

        }).catch((error) => {
          //console.log("cannot get url", url);
        })
      } else {
        setShow(true)
        await stl_file.arrayBuffer().then(async (arrayBuffer) => {
          var buffer = Buffer.from(arrayBuffer);
          var stl = new NodeStl(buffer, {density: material});
          //console.log(stl);
          setSTL_Cal(stl)
          calculatingPrice(stl);
          setDisBtn(false);
        });
      }
    } else {
      alert('Please select file');
    }
  }

  const checkUpload = async () => {
    var up = true;
    //console.log('file name', stl_file.name);
    await listFileOrder.map(filename => {
      //console.log('o ', filename);
      if(filename === stl_file.name){
        up = false;
      }
    })
    await listFileCart.map(filename => {
      //console.log('c ', filename);
      if(filename === stl_file.name){
        up = false;
      }
    })
    //console.log('up', up);
    return up;
  }
 
  const uploadfile = async (buffer) => {
    console.log('uploading...');
    setUpMessage('file is uploading... to 3DSun storage');
    const storageRef = storage.ref();
    //console.log('users_files/'+ currentUser.uid + "/" + stl_file.name);
    await storageRef.child('users_files/'+ currentUser.uid + "/" + stl_file.name)
      .put(buffer).then(() => {
        setUpMessage('');
      }).catch(() => {
        setUpMessage('upload file failed');
      })
    await storageRef.child('users_files/'+ currentUser.uid + "/" + stl_file.name).getDownloadURL().then((url) => {
      //console.log("get url");
      setFileUrl(url);
    }).catch((error) => {
      //console.log("cannot get url", url);
    })
  }

  const calculatingPrice  = (stl_cal) => {
    const x = (50 + stl_cal.weight * (infill / 100) * (size / 100) * (size / 100) * (size / 100) * 10) < 100 ? 100 : (50 + stl_cal.weight * (infill / 100) * (size / 100) * (size / 100) * (size / 100) * 10);
    const price = x * quality;
    //console.log(price);
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

  const createCart = () => {
    if(stl_cal && price && currentUser){
      const id = uuidv4()
      const cartObject = {
        "ID": id,
        "quantity": 1,
        "userId": currentUser.uid,
        "price": price.toFixed(2),
        "file_name": stl_file.name,
        "file_storage_url": stl_url,
        "material": material == 1.27 ? "PETG" : "PLA",
        "layer_height": quality == 1 ? 0.2 : quality == 1.1 ? 0.15 : 0.3,
        "percent_size": size,
        "percent_infill": infill-20,
        "Date": new Date()
      }
      console.log('cart', cartObject);
      db.collection('cart').doc(id).set(cartObject).then(() => {
        alert('add to cart successed')
        history.push('/cart')
      }).catch((error) => {
        alert('add to cart failed')
        console.log('error', error);
      })
    }else{
      setMessage('please click submit button')
    }
  }

  return (
    <div className="mt-5 mb-5">
      {/* <h1>{width}</h1> */}
      <div className={(width < 768) ? "container" : "d-flex justify-content-center container"}> {/* d-flex justify-content-center  */}
        <div>
          {
            (width > 360) ? show ? <STLViewer
            onSceneRendered={(element) => {
                console.log(element)
            }}
            sceneClassName="test-scene"
            file={stl_file}
            className="obj"
            modelColor="#185adb"
            backgroundColor="#f0f0f0"
            width={(width < 400) ? 350 : 400}
            height={(width < 400) ? 350 : 400}
            scale={(size/100)}/> : <div className="rounded" style={{width: (width < 400) ? "350px" : "400px",height: (width < 400) ? "350px" : "400px", backgroundColor: "gray"}}>
          </div> : null
          }
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
              <Button type="submit" onClick={submitStl}  disabled={disBtn}>Submit</Button>
            </div>
            {uploadmessage ? (<div className="col">
              <p className="alert alert-warning">{uploadmessage}</p>
            </div>) : null}
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
                  <p>price: {price.toFixed(2)} bath</p>
                  <p>volume: {(stl_cal.volume * (size / 100) * (size / 100) * (size / 100)).toFixed(2)} cm^3</p>
                  <p>W: {(stl_cal.boundingBox[1] / 10 * size / 100).toFixed(2)} cm</p>
                  <p>D: {(stl_cal.boundingBox[0] / 10 * size / 100).toFixed(2)} cm</p>
                  <p>H: {(stl_cal.boundingBox[2] / 10 * size / 100).toFixed(2)} cm</p>
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
            <p className="alert alert-warning">{message}!</p>}
            {currentUser ? <Button onClick={createCart} disabled={disBtn}>
              Add to cart
            </Button> : <Link className=" btn btn-primary" 
              to="/login">Log In and order now</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;