import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { useEffect } from 'react'

export default function Register() {
    const addressRef = useRef();
    const passwordRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignup(e)  {
        setError('');
        setMessage('');
        setLoading(true)
        e.preventDefault();

        if(passwordRef.current.value){
            await currentUser.updatePassword(passwordRef.current.value).then(() => {
                console.log('update password seccess');
            }).catch((error) => {
                setError(error.message)
            })
        }

        await db.collection("users").doc(currentUser.uid).set({
            address: addressRef.current.value || 'You haven not added the address yet.'
        })
        .then(() => {
            console.log("Document successfully written!");
            setLoading(false);
            setMessage('Document successfully written!')
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    
    useEffect(() => {
        console.log('read address', currentUser.uid);
        const sub = db.collection("users").doc(currentUser.uid)
            .onSnapshot((doc) => {
                console.log("Current data: ", doc.data());
                addressRef.current.value = doc.data().address;
            });
        return () => {
            // cleanup
            sub();
        }
    }, [])

    return(
        <div className="container m-5">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSignup}>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" ref={addressRef} rows={3} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Update Address</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </div>
    )
}
