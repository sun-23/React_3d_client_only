import React from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'

export default function Contact() {
    return (
        <div className="m-5">
            <div className="container">
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" placeholder="name@example.com"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Example textarea</label>
                    <textarea class="form-control" rows="3"></textarea>
                </div>
                <Button className="w-100 mt-4" type="submit">Submit</Button>
            </div>
        </div>
    )
}
