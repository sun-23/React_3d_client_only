import React, { useEffect, useState } from 'react'
import { Card, Button, Col, Row } from "react-bootstrap"
import { Link } from 'react-router-dom'
import STLViewer from '../Component/STLViewer';

function PreviewCard({file, onDelete}) {
    return (
        <Card className="mt-5">
            <Card.Body>
                <Row>
                    <Col>
                        <STLViewer url={file.url}
                        className="mb-2"
                        modelColor="#185adb"
                        backgroundColor="#f0f0f0"
                        width={200}
                        height={200}
                        scale={1}/>
                        <Card.Title className=" mr-auto w-100">{file.name}</Card.Title>
                    </Col>
                    <Col xs lg="2">
                        <Button 
                            className="ml-auto w-100" 
                            variant="danger" 
                            onClick={() => {
                                onDelete(file.url)
                            }}
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
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
                {files.length > 0 ? (files.map((file, index) => {
                    console.log('test map',index,file);
                    // return <p key={index}>{file.name}</p>
                    return <PreviewCard file={file} onDelete={onDelete}/>
                })) : <p className="text-center mb-4 alert alert-warning">file is not uploaded</p> }
            </Card.Body>
        </Card>
    )
}
