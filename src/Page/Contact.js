import { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function Contact() {
    const [email,setEmail] = useState();
    const [name,setName] = useState();
    const [text,setText] = useState();

    const setTextEmail = (e)=> {
        setEmail(e.target.value)
    }

    const setTextName = (e)=> {
        setName(e.target.value)
    }

    const setTextText = (e)=> {
        setText(e.target.value)
    }

    const sentContact = ()=> {
        console.log(email,name,text);
    }

    return (
        <div className="m-5">
            <div className="container">
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" onChange={setTextEmail} value={email} placeholder="name@example.com"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">ชื่อ-นามสกุล</label>
                    <input class="form-control" value={name} onChange={setTextName}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">ข้อความ</label>
                    <textarea class="form-control" rows="3" value={text} onChange={setTextText}></textarea>
                </div>
                <Button className="w-100 mt-4" type="submit" onClick={sentContact}>ส่ง</Button>
            </div>
        </div>
    )
}
