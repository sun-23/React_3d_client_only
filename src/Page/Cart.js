import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col, ButtonGroup, Form } from 'react-bootstrap';
import { db } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'
import STLViewer from '../Component/STLViewer';
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
//todo read cart db

let OmiseCard;
export default function Cart() {

    const { currentUser } = useAuth();
    const [Allcart, setAllcart] = useState([]);
    const [TotalPrice,setTotalPrice] = useState(0);
    const [orderId, setOrderID] = useState(uuidv4());
    OmiseCard = window.OmiseCard;

    useEffect(() => {
        //effect
        loadOmise()
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

    const loadOmise = () => {
        //console.log('process env', process.env)
        OmiseCard.configure({
            publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
            currency: "thb",
            frameLabel: "3DSun",
            submitLabel: "PAY CARD NOW",
            button: "Pay with Omise",
        });
    }

    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'credit_card',
            ortherPaymentMethod: []
        });
        OmiseCard.configureButton('#credit_card');
        OmiseCard.attach();
    }

    const omiseTokenHandler = () => {
        OmiseCard.open({
            amount: 10000,
            frameDescription: 'Invoice ' + String(orderId),
            onCreateTokenSuccess: (nonce) => {
                /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
                console.log('omise token ', nonce);
            },
            onFormClosed: () => {},
        })
    }

    const handleCheckout = (e) => {
        e.preventDefault()
        creditCardConfigure()
        omiseTokenHandler()
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Cart</h2>
                <p className="text-center mb-4"> want instant qoute? <Link to="/instantqoutation"> instant qoute </Link></p>
                <Form>
                    <Row>
                        <Col>
                            <h4 className="text-center">total price {TotalPrice} baht</h4>
                        </Col>
                        <Col>
                            <Button id="credit_card" variant="primary" type="button" onClick={(e) => handleCheckout(e)}>
                                Pay with Credit Card
                            </Button>
                        </Col>
                    </Row>
                </Form>
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
                    <Col xl={2} style={{minWidth: "210px"}}>
                        <STLViewer url={cart.file_storage_url}
                        className="mb-2"
                        modelColor="#185adb"
                        backgroundColor="#f0f0f0"
                        width={200}
                        height={200}
                        scale={1}/>
                    </Col>
                    <Col xl={4}>
                        <Card.Title className=" mr-auto w-100">{cart.file_name}</Card.Title>
                        <Card.Text>Layer Height: {cart.layer_height} mm</Card.Text>
                        <Card.Text>Material: {cart.material}</Card.Text>
                        <Card.Text>Infill: {cart.percent_infill}%</Card.Text>
                        <Card.Text>Size: {cart.percent_size}%</Card.Text>
                    </Col>
                    <Col xl={2}>
                        <Row>
                            <Col xs={8} sm={2}  md={2} xl={6}>
                                <Card.Text>Quantity:</Card.Text>
                            </Col>
                            <Col xs={4} sm={10} md={10} xl={6}>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="secondary" onClick={(e) => onChangeQuantity(cart,e.currentTarget.value)} value={-1}>-</Button>
                                    <Card.Text className="text-center" style={{width: "25px"}}>{cart.quantity}</Card.Text>
                                    <Button variant="secondary" onClick={(e) => onChangeQuantity(cart,e.currentTarget.value)} value={1}>+</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={2}>
                        <Card.Title>Price: {cart.price} baht/pcs</Card.Title>
                    </Col>
                    <Col xl={2}>
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