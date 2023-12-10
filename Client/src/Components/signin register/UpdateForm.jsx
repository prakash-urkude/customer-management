import React, { useState } from 'react';
import axios from 'axios'

import '../signin register/ShowForm.css'
const ReisterForm = ({id ,updateForm ,setUpdateForm}) => {
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role:"",  
    email:"",
    location:""
    
  });
  const apiUrls = process.env.REACT_APP_API_NEXT_PUBLIC_SERVER_URL;

console.log('update - apiurls:16' , apiUrls)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value !== ""){
        setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("formData:",formData)
}
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let updateObj = {};

    for (const key in formData) {
      const value = formData[key];
      if (value !== '') {
        updateObj[key] = value;
      }
    }
    
    console.log('updateObj:', updateObj);
    
    let url = `${apiUrls}/user/UpdateUser/${id}`
    console.log("update - formData46:" , updateObj ,"update - apiUrls:",apiUrls)
    await axios.put(url , updateObj , {
        headers: {
          'x-api-key': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json', // Adjust the content type if needed
        }})   

    .then((success) =>{
      console.log('update - success35:',success.data)       
      
        window.alert(success.data.message) 
        success.data.data.Id && localStorage.setItem('_id' , success.data.data.Id)
        success.data.data.firstName &&  localStorage.setItem('firstName' , success.data.data.firstName)
        success.data.data.lastName && localStorage.setItem('lastName' , success.data.data.lastName)
        success.data.data.email &&  localStorage.setItem('email' , success.data.data.email)
        success.data.data.role && localStorage.setItem('role' , success.data.data.role)
        success.data.data.location && localStorage.setItem('location' , success.data.data.location)
        
        setUpdateForm(false)
        console.log('update - success:',success.data )
    })
    .catch((err) =>{
        console.log('error:',err)
        window.alert(err.response.data.message) 
    })
  };

  return (
    <div className='makeRow update-blurBackground '>
        
      <form className=' update-blurForml' onSubmit={handleSubmit}>
      <h3  >Cancal</h3>
        <h1>Update Data</h1>
        <div className='grid2'>
        <div  className='inputBox'>
          <p>First Name</p>
          <input
          className='inputText'
            name="firstName"
            onChange={handleChange}
            type="text"
            
            autoFocus
            
          />
        </div>

        <div  className='inputBox'>
          <p>Last Name</p>
          <input className='inputText'
            name="lastName"
            onChange={handleChange}
            type="text"
            
            
          />
        </div>
        <div  className='inputBox'>
          <p>Email</p>
          <input className='inputText'
            name="email"
            onChange={handleChange}
            type="text"
            
            
          />
        </div>
        <div  className='inputBox'>
          <p>Department</p>
          <select 
          className='inputText'
            name="role"
            onChange={handleChange}
            type="text"
            
          >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Developer">Developer</option>
          <option value="Manager">Manager</option>
          <option value="Owner">Owner</option>
          </select>
        </div>

        <div  className='inputBox'>
          <p>Location</p>
          <select 
          className='inputText'
            name="location"
            onChange={handleChange}
            type="text"
            
          >
          <option value="">Select Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          </select>
          
        </div>
  

        <div className='paddingOnly'><button className='button1' type="submit">Submit</button></div>
        </div>  
      </form>
    </div>
  );
};

export default ReisterForm;
