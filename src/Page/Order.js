import React, { useEffect, useState } from 'react'
import { Card, Button, Col, Row } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'
import STLViewer from '../Component/STLViewer';

// check file in cart and order

export default function Order() {

    const [orders, setOrders] = useState([]);
    const { currentUser } = useAuth()

    useEffect(() => {
        // effect
        setOrders([])
        const sub = db.collection("order")
            .where("userId", "==", currentUser.uid)
            .onSnapshot(async (querySnapshot) => {
                var orders = []
                await querySnapshot.forEach((doc) => {
                    orders.push({
                        ...doc.data(), 
                        "date_string": String(new Date(doc.data().Date.seconds * 1000))
                    })
                });
                await orders.sort(function(a, b) {
                    var keyA = new Date(a.Date.seconds),
                        keyB = new Date(b.Date.seconds);
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                await setOrders(orders)
            });
        return () => {
            // cleanup
            sub();
        }
    }, [])

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Orders</h2>
                {/* {console.log('orders', orders)} */}
                {orders.length > 0 ? orders.map((order) => {
                    return <OrderDetail order={order}/>
                }) : null}
            </Card.Body>
        </Card>
    )
}

function OrderDetail({order}) {

    return(
        <Card className="mt-5">
            <Card.Body>
                <Row>
                    <Col>
                        <h6><strong>Id:</strong> {order.orderId}</h6>
                    </Col>
                    <Col>
                        <h6><strong>Created:</strong> {order.date_string}</h6>
                    </Col>
                </Row>
                <h6><strong>Address:</strong> {order.Address}</h6>
                {order.Product.length > 0 ? order.Product.map((model) => {
                    return <ModelDetail model={model}/>
                }) : null}
            </Card.Body>
        </Card>
    )
}

function ModelDetail({model}) {
    return(
       <Card className="mt-1">
            <Card.Body>
                <Row>
                    <Col xl={2} style={{minWidth: "210px"}}>
                        <STLViewer url={model.file_storage_url}
                        className="mb-2"
                        modelColor="#185adb"
                        backgroundColor="#f0f0f0"
                        width={200}
                        height={200}
                        scale={1}/>
                    </Col>
                    <Col xl={4}>
                        <Card.Title className=" mr-auto w-100">{model.file_name}</Card.Title>
                        <Card.Text>Layer Height: {model.layer_height} mm</Card.Text>
                        <Card.Text>Material: {model.material}</Card.Text>
                        <Card.Text>Infill: {model.percent_infill}%</Card.Text>
                        <Card.Text>Size: {model.percent_size}%</Card.Text>
                    </Col>
                    <Col xl={3}>
                        <Card.Text>Quantity: {model.quantity}</Card.Text>
                    </Col>
                    <Col xl={3}>
                        <Card.Title>Price: {model.price} baht/pcs</Card.Title>
                    </Col>
                </Row>
            </Card.Body>
        </Card> 
    )
}