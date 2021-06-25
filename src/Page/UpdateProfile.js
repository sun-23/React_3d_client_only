import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Register() {
    const addressRef = useRef();
    const passwordRef = useRef();
    const { currentUser } = useAuth();
    const [error1, setError1] = useState('');
    const [message1, setMessage1] = useState('');
    const [error2, setError2] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('');
    const history = useHistory();

    async function handleSignup(e)  {
        e.preventDefault();
        setError1('');
        setMessage1('');
        setError2('');
        setLoading(true)

        if(addressRef.current.value){
            await db.collection("users").doc(currentUser.uid).set({
                address: addressRef.current.value
            })
            .then(() => {
                console.log("Document successfully written!");
                setMessage1('Document successfully written!');
                addressRef.current.value = '';
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
                setError1("Error writing document");
            });
        } else {
            console.log('address is not updated.');
        }

        setLoading(false);

        if(passwordRef.current.value !== ''){
            await currentUser.updatePassword(passwordRef.current.value).then(() => {
                history.push('/')
            }).catch((error) => {
                setError2(error.message)
            })
        } else {
            console.log('password is not updated');
        }
    }
    
    useEffect(() => {
        const sub = db.collection("users").doc(currentUser.uid)
            .onSnapshot((doc) => {
                // console.log("Current data: ", doc.data());
                setCurrentAddress(doc.data().address);
            });
        return () => {
            // cleanup
            sub();
        }
    }, [])

    return(
        <div className="m-5">
            <div className="container">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Profile</h2>
                        {error1 && <Alert variant="danger">{error1}</Alert>}
                        {error2 && <Alert variant="danger">{error2}</Alert>}
                        {message1 && <Alert variant="success">{message1}</Alert>}
                        <Form onSubmit={handleSignup}>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control as="textarea" ref={addressRef} rows={3} placeholder={currentAddress}/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-4" type="submit">Update Address</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div>
            </div>
        </div>
    )
}
