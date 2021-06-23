import { useState, useEffect } from "react"
import { Card, Button, Alert, Tab, Col, Nav } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { storage, db } from '../firebase/firebase'
var Buffer = require("buffer/").Buffer;

//page
import Order from "./Order"
import Files from "./Files"

export default function Dashboard() {
  const [error, setError] = useState("")
  const [address, setAddress] = useState("")
  const [list_files, setFiles] = useState([])
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const storageRef = storage.ref();

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  function loadFiles(){
    setFiles([]);
    const listFileRef = storageRef.child('users_files/'+ currentUser.uid);
    listFileRef.listAll().then(res => {
      res.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(url => {
          // set cors to down load blob from browser
          // cd to google-cloud-sdk/bin folder
          // create cors.json file content [{ "origin": ["*"],"method": ["GET"],"maxAgeSeconds": 3600}]
          // ./gsutil cors set cors.json gs://<your-cloud-storage-bucket>

          // var xhr = new XMLHttpRequest();
          // xhr.responseType = 'blob';
          // xhr.onload = async (event) => {
          //   var blob = xhr.response;
          //   var file = new File([blob], itemRef.name); //not use because stl can use url
          //   setFiles(old => [...old, { "name": itemRef.name, "url": url, "File": file }])
          // };
          // xhr.open('GET', url);
          // xhr.send();
          setFiles(old => [...old, { "name": itemRef.name, "url": url }])
        });
      });
    }).catch((error) => {
      console.log('error',error);
    })
  }

  useEffect(() => {
    setFiles([]);
    console.log('read address', currentUser.uid);

    const sub = db.collection("users").doc(currentUser.uid).onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
      setAddress(doc.data().address);
    });

    loadFiles();

    return () => {
        // cleanup
        sub();
    }
  }, [])

  const onDeleteFile = (url) => {
    console.log(url);
    const deleteRef = storage.refFromURL(url)
    deleteRef.delete().then(() => {
      // File deleted successfully
      loadFiles();
      alert('delete success');
    }).catch((error) => {
      // Uh-oh, an error occurred!
      alert('delete error', error);
    });
  }

  return (
    <div className="m-5">
      <Tab.Container defaultActiveKey="profile">
        <Col>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="order">Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="file">Files</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="profile">
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="col">
                  <div className="col">
                    <strong>Email:</strong> {currentUser.email}
                  </div>
                  <div className="col">
                    <strong>Address:</strong> {address}
                  </div>
                </div>
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                  Update Address
                </Link>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              <Button variant="link" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </Tab.Pane>
          {/* Orders  */}
          <Tab.Pane eventKey="order">
            <Order/>
          </Tab.Pane>
          {/* Files */}
          <Tab.Pane eventKey="file">
            <Files files={list_files} onDelete={onDeleteFile}/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}