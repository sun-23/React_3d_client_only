import { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function Contact() {
    const [email,setEmail] = useState('');
    const [subject,setSubject] = useState('');
    const [name,setName] = useState('');
    const [text,setText] = useState('');

    const setTextEmail = (e)=> {
        setEmail(e.target.value)
    }

    const setTextName = (e)=> {
        setName(e.target.value)
    }

    const setTextSubject = (e)=> {
        setSubject(e.target.value)
    }

    const setTextText = (e)=> {
        setText(e.target.value)
    }

    return (
        <div className="mt-5 mb-5">
            <div className="container w-50" style={{ minWidth: "300px" }}>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" onChange={setTextEmail} value={email} placeholder="name@example.com"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input class="form-control" value={name} onChange={setTextName}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Subject</label>
                    <input class="form-control" value={subject} onChange={setTextSubject}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Message</label>
                    <textarea class="form-control" rows="3" value={text} onChange={setTextText}></textarea>
                </div>
                <a 
                    className="w-100 mt-4 btn btn-primary" 
                    href={
                    `mailto:twinsamson@gmail.com
                    ?subject=${subject || ""}
                    &body=${text + " sent from " + name + " email " + email || ""}`
                }>
                    Submit
                </a>
            </div>
        </div>
    )
}
