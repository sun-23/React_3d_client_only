import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function Policy() {
    return (
        <div className="m-5">
            <div className="container">
                <h1 className="fw-bold text-center">Business policy</h1>
                <Row>
                    <Col>
                        <p><strong>Shipping</strong> Free delivery via Thailand Post EMS</p>
                    </Col>
                    <Col>
                        <p><strong>Order Cancellation/Cancellation of Service</strong> You cannot cancel your order, please check your cart before purchasing.</p>
                    </Col>
                    <Col>
                        <p><strong>Return/Refund</strong> If the product is damaged, please contact admin, please provide complete details.</p>
                    </Col>
                </Row>
            </div>   
        </div>
    )
}