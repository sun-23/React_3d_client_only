import React from 'react'
import background from '../image/background.jpg'

export default function Home() {
    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/image/background.jpg'})`,
            backgroundSize:'cover',
            height: "600px",
            color: "white",
            fontFamily: "Mitr, sans-serif",
            display:"flex",
            flexWrap:"wrap",
            alignContent:"center"
        }}>
            <div style={{margin:"auto"}}>
                <h1 className="fw-bold">บริการผลิตชิ้นงาน</h1>
                <p>สร้างสรรค์ผลงานของคุณเอง ในราคาที่ดีที่สุด</p>
            </div>
        </div>
    )
}
