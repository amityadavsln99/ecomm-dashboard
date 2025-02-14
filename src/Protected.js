import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

function Protected(props){
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            navigate('/register');
        }
    },[]);
    let Cmp=props.Cmp;
    return(
        <div>
            <Cmp />
        </div>
    )
}
export default Protected;