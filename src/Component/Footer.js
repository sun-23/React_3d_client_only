import React from 'react'
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div style={{backgroundColor:"gray", color: "white"}}>
            <div className="container p-3">
                <div className="row">
                    <div className="col-12 col-md">
                        <h5 className="fw-bold">3DSun</h5>
                        <p>© 2021–2021</p>
                    </div>
                    <div className="col-6 col-md">
                        <p className="fw-bold">ข้อมูล</p>
                        <Link className="text-light" to="/contact">ติดต่อเรา</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
