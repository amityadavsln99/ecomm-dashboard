import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

function Login(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }
    },[]);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    async function login() {
        let item = { password, email };
        let result= await fetch('http://localhost:8000/api/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify(item),
        });
        result = await result.json();
        localStorage.setItem('user-info',JSON.stringify(result));
        navigate('/add');
    }
    return(
        <>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1>Login</h1>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="form-control" /><br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="form-control" /><br />
                <button onClick={login} className="btn btn-primary">Login</button>
            </div>
        </>
    )
}
export default Login;