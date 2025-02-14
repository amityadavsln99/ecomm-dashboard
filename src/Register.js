import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // <-- Use useNavigate instead of useHistory
import Header from "./Header";

function Register() {
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            // navigate.push('/add');
            navigate('/add');
        }
    },[]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // <-- Use useNavigate hook

  async function signUp() {
    let item = { name, password, email };
    // console.warn(item);
    let results = await fetch('http://localhost:8000/api/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(item),
    });
    results = await results.json();
    // console.warn("result:", results);
    localStorage.setItem("user-info", JSON.stringify(results));
    navigate("/add"); // <-- Use navigate instead of history.push
  }

  return (
    <>
        <Header />
        <div className="col-sm-6 offset-sm-3">
        <h1>User Sign Up</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" className="form-control" /><br />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="form-control" /><br />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="form-control" /><br />
        <button onClick={signUp} className="btn btn-primary">Sign Up</button>
        </div>
    </>
  );
}

export default Register;