import React from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const navigate = useNavigate();
const {token}=useAuth();
  return (
    <main className='login-bg' style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
    <section style={{placeContent:'space-evenly',placeItems:'center'}}>
      <h2>Todo App</h2>
      {token ?<h2>Logged In</h2>:<><button onClick={()=>navigate('/login')} style={{}}><span className="circle1"></span>
    <span className="circle2"></span>
    <span className="circle3"></span>
    <span className="circle4"></span>
    <span className="circle5"></span>
    <span className="text">Login <FontAwesomeIcon icon={faArrowRight} /></span></button></>}
    </section>
    </main>
  );
}
