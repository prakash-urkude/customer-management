import React, { useState } from 'react';
import axios from 'axios'


const ReisterForm = ({activeForm , setActiveForm}) => {
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role:"",  
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

    let url = `${apiUrls}/user/register`
    console.log("formData24:" , formData ,"apiUrls:",apiUrls)
    await axios.post(url , formData)    

    .then((success) =>{
      console.log('success35:',success.data)       
      
        window.alert(success.data.message) 
        setActiveForm('login')
        console.log('success:',success.data )
    })
    .catch((err) =>{
        console.log('error:',err)
        window.alert(err.response.data.message) 
    })
  };

  return (
    
    <div className=' makeRow'>
      <form className='padding margin' onSubmit={handleSubmit}>
        <div className='grid2'>
        <div  className='inputBox'>
          <p>First Name</p>
          <input
          className='inputText'
            name="firstName"
            onChange={handleChange}
            type="text"
            required
            autoFocus
            
          />
        </div>

        <div  className='inputBox'>
          <p>Last Name</p>
          <input className='inputText'
            name="lastName"
            onChange={handleChange}
            type="text"
            required
            
          />
        </div>
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
          <p>Department</p>
          <select 
          className='inputText'
            name="role"
            onChange={handleChange}
            type="text"
            required
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
            required
          >
          <option value="">Select Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          </select>
          
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

export default ReisterForm;
