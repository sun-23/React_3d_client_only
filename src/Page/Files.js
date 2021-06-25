import React, { useEffect, useState } from 'react'
import { Card, Button, Col, Row } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'
import STLViewer from '../Component/STLViewer';

// check file in cart and order

function PreviewCard({file, onDelete}) {

    const { currentUser } = useAuth()
    const [isDelete, setDelete] = useState(true);

    useEffect(() => {
        //effect
        db.collection("cart").where("userID", "==", currentUser.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data().file_name);
                    //console.log('match',doc.data().file_name,file.name,doc.data().file_name === file.name);
                    if(doc.data().file_name === file.name){
                        setDelete(false);
                    }
                    return
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [])

    return ( 
        <Card className="m-1" style={{ width: '261px' }}>
            <Card.Body>
                <STLViewer url={file.url}
                className="mt-2 mb-1"
                modelColor="#185adb"
                backgroundColor="#f0f0f0"
                width={200}
                height={200}
                scale={1}/>
                <Card.Text>{file.name}</Card.Text>
                {isDelete ?
                    <Button  
                    variant="danger" 
                    onClick={() => {
                        onDelete(file.url)
                    }}
                >
                    Delete
                </Button> : <p className="alert alert-warning text-center">
                    your file is in cart or order
                </p>
                }
                {/* <p>{isDelete ? "true": "false"}</p> */}
            </Card.Body>
        </Card>
    )
}

export default function Files({files, onDelete}) {

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">User Files</h2>
                <p className="text-center mb-4">want to upload file? <Link to="/instantqoutation"> upload file </Link></p>
                {console.log('list_files',files)}
                <Row>
                    {files.length > 0 ? (files.map((file, index) => {
                        // console.log('test map',index,file);
                        // return <p key={index}>{file.name}</p>
                        return <PreviewCard file={file} onDelete={onDelete}/>
                    })) : <p className="text-center mb-4 alert alert-warning">file is not uploaded</p> }
                </Row>
            </Card.Body>
        </Card>
    )
}
