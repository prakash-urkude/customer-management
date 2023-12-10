// ShowData.js
import React, { useState, useEffect } from 'react';
import './ShowdataUser.css';
import getAllUsers from '../Apicall/GetAllUsers'; // Import the API call function
import { useNavigate } from 'react-router-dom';
import UpdateFormcomponent from '../signin register/UpdateForm' ;
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
const ShowData = () => {
  const Navigate = useNavigate()
  const [user, setUser] = useState([]);
  const [updateForm , setUpdateForm] = useState(false)
  const [selectedId, setSelectedId] = useState(null);

  const [deleted, setDeleted] = useState(false);
  const apiUrls = process.env.REACT_APP_API_NEXT_PUBLIC_SERVER_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getAllUsers();
        
        console.log('userData14:' , userData)
        setUser(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [updateForm , deleted]);

  console.log('setUser24:' , user)

  const handleLogout =() =>{
    window.alert("Are you sure ?")
    
    localStorage.clear()
    Navigate('/')
  }

  const handleLocation = async (e) => {
    try {
      const location = e.target.value;
      
        const response = await axios.get(`${apiUrls}/user/viewUserByLocation`, {
        params: { location: location },
      });
  console.log("response1:" , response)
       setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data by location:', error);
    }
  };
  

const handleUpdate =(id) =>{
console.log("handleUpdate - 35:", id)
setUpdateForm(true)
setSelectedId(id);
}
const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this user?');
    if (!shouldDelete) {
      return;
    } 
    try {
         await axios.delete(`${apiUrls}/user/deleteuser/${id}`, {
        headers: {
          'x-api-key': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });
      // Handle success, such as updating the UI or navigating to another page
      setDeleted((prevDeleted) => !prevDeleted);
      console.log('Delete successful');
    } catch (error) {
      // Handle errors
      console.error('Delete failed:', error);
    }
  };
  //and on handledelete and update run use effect
  
  return (
    <div className='row5' >
        <div className='row5' style={{backgroundColor:'#ff89',padding:5 , display:'flex', justifyContent:'space-around'}}>
          <p>Filter: </p>
            <div  className='inputBox' style={{display:'flex'}}>
        <p>Location</p>
          <select 
          className='inputText'
            name="location"
            onChange={(e)=> handleLocation(e)}
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
        </div> 

        <div style={{display:'flex' ,justifyContent:'space-around', flexWrap:'wrap' , margin:'0 auto'}} className='row5'>
        { updateForm && <UpdateFormcomponent id={selectedId} updateForm={updateForm} setUpdateForm={setUpdateForm} /> }
      {user && user.map((user) =>(
        <div >
        <div className='usercard' key={user._id}>

           
          <div className='leftside'>
            <p>FirstName: {user.firstName}</p>
            <p>LastName: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Location: {user.location}</p>
            <p>Department: {user.role}</p>
          </div>
          <div className='column'>
            <button className='' onClick={() =>handleUpdate(user._id)}><MdEdit /></button>
           <button className='' onClick={() =>handleDelete(user._id)}><MdDelete /></button>    
          </div>
          
          <br />
          
        </div>
        </div>
      ))}
     </div>
    </div>
  );
};

export default ShowData;
 