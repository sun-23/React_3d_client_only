import React from 'react'
import { Link } from "react-router-dom";
import background from '../image/background.jpg'

export default function Home() {
    return (
        <div>
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
                    <h1 className="fw-bold">3D Priting Services</h1>
                    <p>Create your own product at the most affordable price</p>
                    <p>Start from 100 baht</p>
                </div>
            </div>
            <div style={{
                height: "200px",
                display:"flex",
                flexWrap:"wrap",
                alignContent:"center"
            }}>
                <Link 
                    style={{
                        margin:"auto",
                        padding: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        backgroundColor: "gray",
                        color: "white",
                        textDecoration: "none"
                    }}  
                    to="/signup"
                >Register and order now</Link>
            </div>
        </div>
    )
}
