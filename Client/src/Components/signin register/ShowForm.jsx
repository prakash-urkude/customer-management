
import React, { useState , useEffect } from 'react';
import Signin from "../signin register/Signin";
import Register from "../signin register/Register";
import './ShowForm.css';  

const ShowForm = () => {
   
  const [activeForm, setActiveForm] = useState('login');

  console.log("showform - activeForm11:", activeForm)
  const switchToLogin = () => {
    setActiveForm('login');
  };

  const switchToRegister = () => { 
    setActiveForm('register');
  };

  

  return (
    <div className="containerForm">
      <div className="form-switch box2">
        <p onClick={switchToLogin}>Login</p>
        <p onClick={switchToRegister}>Register</p>
      </div>

      <div className="form-switch box4">
        {activeForm === 'login' && <Signin />}
        {activeForm === 'register' && <Register activeForm={activeForm} setActiveForm={setActiveForm} />}
      </div> 
    </div>
  );
};

export default ShowForm;
