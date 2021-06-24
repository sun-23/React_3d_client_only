import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap';
import { db } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'
import STLViewer from '../Component/STLViewer';
import { Link } from 'react-router-dom'
//todo read cart db

export default function Cart() {

    const { currentUser } = useAuth()
    const [Allcart, setAllcart] = useState([]);

    useEffect(() => {
        //effect
        setAllcart([])
        const sub = db.collection("cart").where("userID", "==", currentUser.uid)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data()
                    console.log('cart',doc.data());
                    setAllcart(old => [...old, doc.data()])
                });
            });
        return () => {
            //cleanup
            sub();
        }
    }, [])

    const onDelete = (id) => {
        setAllcart([])
        db.collection("cart").doc(id).delete().then(() => {
            alert("Cart id " + id + " successfully deleted!");
        }).catch((error) => {
            alert("Error removing document: ", error);
        });
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Cart</h2>
                <p className="text-center mb-4"> want instant qoute? <Link to="/instantqoutation"> instant qoute </Link></p>
                {console.log('cart',Allcart)}
                {Allcart.length > 0 ? (Allcart.map((cart) => {
                    return <PreviewCart key={cart.id} cart={cart} onDelete={onDelete}/>
                })) : <p className="text-center mb-4 alert alert-warning">cart empty</p> }
            </Card.Body>
        </Card>
    )
}

function PreviewCart({cart, onDelete}) {
    return (
        <Card className="mt-5">
            <Card.Body>
                <Row>
                    <Col>
                        <STLViewer url={cart.file_storage_url}
                        className="mb-2"
                        modelColor="#185adb"
                        backgroundColor="#f0f0f0"
                        width={200}
                        height={200}
                        scale={1}/>
                        <Card.Title className=" mr-auto w-100">{cart.file_name}</Card.Title>
                        <Card.Text>Price: {cart.price} bath</Card.Text>
                        <Card.Text>Layer Height: {cart.layer_height} mm</Card.Text>
                        <Card.Text>Material: {cart.material}</Card.Text>
                        <Card.Text>Infill: {cart.percent_infill}%</Card.Text>
                        <Card.Text>Size: {cart.percent_size}%</Card.Text>
                    </Col>
                    <Col xs lg="1">
                        <Button 
                        className="ml-auto w-100" 
                        variant="danger" 
                        onClick={() => {
                            onDelete(cart.ID)
                        }}
                        > Delete
                        </Button> 
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
