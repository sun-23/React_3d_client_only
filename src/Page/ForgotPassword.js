import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetpassword } = useAuth() //context
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSignIn(e)  {
        await setError('');
        await setLoading(true)
        e.preventDefault();

        await resetpassword(emailRef.current.value).then((value) => {
            setLoading(false);
            setMessage('The password reset link is sent to your email address')
        }).catch((error) => {
            setError(error.message);
        })
    }

    return(
        <div className="m-5">
            <div className="container w-50">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Password Reset</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSignIn}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
                        </Form>
                        <div className="w-100 text-center mt-2">
                            <Link to="/login">Log In</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}