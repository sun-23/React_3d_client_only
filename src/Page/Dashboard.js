import { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db } from '../firebase/firebase'

export default function Dashboard() {
  const [error, setError] = useState("")
  const [address, setAddress] = useState("");
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect(() => {
      console.log('read address', currentUser.uid);
      const sub = db.collection("users").doc(currentUser.uid)
          .onSnapshot((doc) => {
              console.log("Current data: ", doc.data());
              setAddress(doc.data().address);
          });
      return () => {
          // cleanup
          sub();
      }
  }, [])

  return (
    <div className="m-5">
      <div className="container">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="col">
              <div className="col">
                <strong>Email:</strong> {currentUser.email}
              </div>
              <div className="col">
                <strong>Address:</strong> {address}
              </div>
            </div>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Address
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}