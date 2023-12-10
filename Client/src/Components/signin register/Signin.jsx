import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
const Navigate = useNavigate()
  const [formData, setFormData] = useState({
   
    email:"",
    password: '',
  });
  const apiUrls = process.env.REACT_APP_API_NEXT_PUBLIC_SERVER_URL;

console.log('apiurls:16' , apiUrls)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = `${apiUrls}/user/login`
    console.log("formData24:" , formData ,"apiUrls:",apiUrls)
    await axios.post(url , formData)    

    .then((success) =>{

      localStorage.setItem('_id' , success.data.data.Id)
      localStorage.setItem('firstName' , success.data.data.firstName)
      localStorage.setItem('lastName' , success.data.data.lastName)
      localStorage.setItem('email' , success.data.data.email)
      localStorage.setItem('role' , success.data.data.role)
      localStorage.setItem('location' , success.data.data.location)
      localStorage.setItem('password' , success.data.data.password)

        localStorage.setItem('token' , success.data.data.accessToken)

        window.alert(success.data.message) 
        console.log('success:',success.data)
        Navigate('/showuser')
    })
    .catch((err) =>{
        console.log('error:',err)
        window.alert(err.response.data.message) 
    })
  };

  return (
    <div className='makeRow'>
      <form className='padding margin' onSubmit={handleSubmit}>
        <div className='grid2'>
       
        <div  className='inputBox'>
          <p>Email</p>
          <input className='inputText'
            name="email"
            onChange={handleChange}
            type="text"
            required
            
          />
        </div>

        <div  className='inputBox'>
          <p>Password</p>  
          <input className='inputText'
            name="password"
            type="password"
            onChange={handleChange}
            required
            
          />
        </div>

        <div className='float-end'><button className='button1' type="submit">Submit</button></div>
        </div>  
      </form>
    </div>
  );
};

export default LoginForm;
