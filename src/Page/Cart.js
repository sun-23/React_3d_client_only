import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col, ButtonGroup } from 'react-bootstrap';
import { db } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'
import STLViewer from '../Component/STLViewer';
import { Link } from 'react-router-dom'
//todo read cart db

export default function Cart() {

    const { currentUser } = useAuth();
    const [Allcart, setAllcart] = useState([]);
    const [TotalPrice,setTotalPrice] = useState(0);

    useEffect(() => {
        //effect
        setAllcart([])
        setTotalPrice(0)
        const sub = db.collection("cart").where("userID", "==", currentUser.uid)
            .onSnapshot((querySnapshot) => {
                var cart = []
                var price = 0;
                querySnapshot.forEach((doc) => {
                    // doc.data()
                    console.log('cart',doc.data(), 'price', parseFloat(doc.data().price) * parseFloat(doc.data().quantity))
                    // setTotalPrice(old => old + parseFloat(doc.data().price) * parseFloat(doc.data().quantity))
                    // setAllcart(old => [...old, doc.data()])
                    cart.push(doc.data())
                    price = price + (parseFloat(doc.data().price) * parseFloat(doc.data().quantity))
                });
                setAllcart(cart)
                setTotalPrice(price)
            });
        return () => {
            //cleanup
            sub();
        }
    }, [])

    const onDelete = (id) => {
        db.collection("cart").doc(id).delete().then(() => {
            alert("Cart ID " + id + " successfully deleted!");
        }).catch((error) => {
            alert("Error removing document: ", error);
        });
        setAllcart([])
    }

    const onChangeQuantity = (cart,number) => {
        if(parseInt(number) + cart.quantity !== 0){
            const newCartObject = {
                ...cart,
                "quantity": parseInt(number) + cart.quantity
            }

            db.collection('cart').doc(cart.ID).set(newCartObject).then(() => {
                //
            }).catch((error) => {
                // console.log('error', error);
            })
        }
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Cart</h2>
                <p className="text-center mb-4"> want instant qoute? <Link to="/instantqoutation"> instant qoute </Link></p>
                <h4 className="text-center">total price {TotalPrice} baht</h4>
                {console.log('cart',Allcart)}
                {Allcart.length > 0 ? (Allcart.map((cart) => {
                    return <PreviewCart key={cart.id} onChangeQuantity={onChangeQuantity} cart={cart} onDelete={onDelete}/>
                })) : <p className="text-center mb-4 alert alert-warning">cart empty</p> }
            </Card.Body>
        </Card>
    )
}

function PreviewCart({cart, onDelete, onChangeQuantity}) {

    return (
        <Card className="mt-5">
            <Card.Body>
                <Row>
                    <Col sm={2} style={{minWidth: "210px"}}>
                        <STLViewer url={cart.file_storage_url}
                        className="mb-2"
                        modelColor="#185adb"
                        backgroundColor="#f0f0f0"
                        width={200}
                        height={200}
                        scale={1}/>
                    </Col>
                    <Col sm={4}>
                        <Card.Title className=" mr-auto w-100">{cart.file_name}</Card.Title>
                        <Card.Text>Layer Height: {cart.layer_height} mm</Card.Text>
                        <Card.Text>Material: {cart.material}</Card.Text>
                        <Card.Text>Infill: {cart.percent_infill}%</Card.Text>
                        <Card.Text>Size: {cart.percent_size}%</Card.Text>
                    </Col>
                    <Col sm={2}>
                        <Row>
                            <Col sm={5}>
                                <Card.Text>Quantity:</Card.Text>
                            </Col>
                            <Col sm={7}>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="secondary" onClick={(e) => onChangeQuantity(cart,e.currentTarget.value)} value={-1}>-</Button>
                                    <Card.Text className="text-center" style={{width: "25px"}}>{cart.quantity}</Card.Text>
                                    <Button variant="secondary" onClick={(e) => onChangeQuantity(cart,e.currentTarget.value)} value={1}>+</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={2}>
                        <Card.Title>Price: {cart.price} baht/pcs</Card.Title>
                    </Col>
                    <Col sm={2}>
                        <Button 
                        className="w-100" 
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
