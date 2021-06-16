import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth() //context
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSignup(e)  {
        await setError('');
        await setLoading(true)
        e.preventDefault();

        await signup(emailRef.current.value, passwordRef.current.value).then((value) =>{
            console.log(value);
            setLoading(false)
        }).catch((error) => {
            console.log('error', error);
            setError(error.message)
            setLoading(false)
        })
    }

    return(
        <div className="container m-5">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSignup}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Aready have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}