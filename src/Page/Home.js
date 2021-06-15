import React from 'react'
import { Link } from "react-router-dom";
import background from '../image/background.jpg'

export default function Home() {
    return (
        <div style={{fontFamily: "Mitr, sans-serif"}}>
            <div style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/image/background.jpg'})`,
                backgroundSize:'cover',
                height: "600px",
                color: "white",
                display:"flex",
                flexWrap:"wrap",
                alignContent:"center"
            }}>
                <div style={{margin:"auto"}}>
                    <h1 className="fw-bold">บริการผลิตชิ้นงาน</h1>
                    <p>สร้างสรรค์ผลงานของคุณเอง ในราคาที่ดีที่สุด</p>
                </div>
            </div>
            <div style={{
                height: "200px",
                display:"flex",
                flexWrap:"wrap",
                alignContent:"center"
            }}>
                <Link 
                    style={{margin:"auto"}} 
                    className="btn btn-secondary" 
                    to="/signup"
                >ลงทะเบียนและสั่งงานตอนนี้</Link>
            </div>
        </div>
    )
}
