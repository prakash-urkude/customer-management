import React, { useState, useEffect } from 'react';
import './ShowdataUser.css';
import getAllUsers from '../Apicall/GetAllUsers';
import { useNavigate } from 'react-router-dom';
import UpdateFormcomponent from '../signin register/UpdateForm';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ShowData = ({ updateData, setUpdateData }) => {
  const Navigate = useNavigate();
  const [ascending, setAscending] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const apiUrls = process.env.REACT_APP_API_NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getAllUsers();
        setAllUser(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    setUpdateData(!updateData);
    fetchData();
  }, [updateForm, setUpdateForm, deleted]);

  const handleLogout = () => {
    window.alert("Are you sure ?");
    localStorage.clear();
    Navigate('/');
  };

  const handleLocation = async (e) => {
    try {
      const location = e.target.value;
      const response = await axios.get(`${apiUrls}/user/viewUserByLocation`, {
        params: { location: location },
      });
      setAllUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user data by location:', error);
    }
  };

  const handleUpdate = (id) => {
    setUpdateForm(true);
    setSelectedId(id);
  };

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
      setDeleted((prevDeleted) => !prevDeleted);
      console.log('Delete successful');
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const sortedUsers = [...allUser].sort((a, b) => {
    const nameA = a.firstName.toLowerCase();
    const nameB = b.firstName.toLowerCase();
    return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const toggleSortOrder = () => {
    if (ascending === "") {
      setAscending(true);
    } else {
      setAscending((prevAscending) => !prevAscending);
    }
    setAllUser(sortedUsers);
  };

  return (
    <div className='row5'>
      <div className='row5' style={{ backgroundColor: '#ff89', padding: 5, display: 'flex', justifyContent: 'space-around' }}>
        <p className='sortIcon' onClick={() => setAscending('')} style={{ margin: 20 }}> Clear Filter: </p>
        <div>
          {ascending ? <p className='sortIcon' style={{ margin: 20 }} onClick={toggleSortOrder}>Descending <FaArrowUp style={{ transform: 'rotate(180deg)' }} /></p> :
            <p className='sortIcon' style={{ margin: 20 }} onClick={toggleSortOrder}>Ascending <FaArrowUp /> </p>}
        </div>
        <div className='inputBox' style={{ display: 'flex' }}>
          <p style={{ margin: 20 }}>Location</p>
          <select
            className='inputText sortIcon'
            name="location"
            onChange={(e) => handleLocation(e)}
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

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', margin: '0 auto' }} className='row5'>
        {updateForm && <UpdateFormcomponent id={selectedId} updateForm={updateForm} setUpdateForm={setUpdateForm} />}
        {allUser && sortedUsers && allUser.map((user) => (
          <div key={user._id} className='usercard fade-in' style={{ backgroundColor: 'pink', margin: 10, borderRadius: '2px 20px' }}>
            <div className='leftside'>
              <p>FirstName: {user.firstName}</p>
              <p>LastName: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Location: {user.location}</p>
              <p>Department: {user.role}</p>
            </div>
            <div className='column'>
              <button className='uD sortIcon' onClick={() => handleUpdate(user._id)}><MdEdit /></button>
              <button className='uD sortIcon' onClick={() => handleDelete(user._id)}><MdDelete /></button>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowData;