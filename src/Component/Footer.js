import React from 'react'
import { Link } from "react-router-dom";
import { Row } from 'react-bootstrap';

export default function Footer() {
    return (
        <div style={{backgroundColor:"gray", color: "white"}}>
            <div className="container p-3">
                <div className="row">
                    <div className="col-6 col-md">
                        <h5 className="fw-bold">3DSun</h5>
                        <p className="mt-3">© 2021–2021</p>
                    </div>
                    <div className="col-6 col-md">
                        <p className="fw-bold">About</p>
                        <Row>
                            <Link className="text-light" to="/contact">Contact Us</Link>
                            <Link className="text-light" to="/policy">Policy</Link>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}
