import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './ShowdataUser.css';
import '../signin register/ShowForm.css'
import getUserById from '../Apicall/GetUser';
import { useNavigate } from 'react-router-dom';
import ShowAlldata from '../ShowData/ShowAlldata';

const ShowData = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState({});

  const fetchUserData = useCallback(async () => {
    try {
      const userData = await getUserById();
      console.log('userData14:', userData);
      setUser(userData.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUser]);

  useEffect(() => {
    fetchUserData();
  }, [localStorage, fetchUserData]);

  const memoizedUser = useMemo(() => user, [user]);

  const handleLogout = useCallback(() => {
    window.alert("Are you sure ?");
    localStorage.clear();
    Navigate('/');
  }, [Navigate]);

  return (
    <div className='row5 centermargin'>
      <div className='manager'>
        {memoizedUser &&
          <div className='managercard' style={{borderRadius:'2px 40px',backgroundColor:'#e3e2eaa1'}} key={memoizedUser._id}>
            <div className='leftside'>
              <p className='inputText'>FirstName: {memoizedUser.firstName}</p>
              <p className='inputText'>LastName: {memoizedUser.lastName}</p>
              <p className='inputText'>Email: {memoizedUser.email}</p>
              <p className='inputText'>Location: {memoizedUser.location}</p>
              <p className='inputText'>Department: {memoizedUser.role}</p>
            </div>
            <div className='rightside'>
              <button style={{ marginBottom: 5 }} className='button1 float-end' onClick={handleLogout}>Logout</button>
              <img className='img' src="https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png" alt="User Profile" />
              <p style={{ fontWeight: 600 }} className='inputItem'>Welcome Manager: {localStorage.getItem('firstName')}</p>
            </div>
            <br />
          </div>
        }
      </div>

      {memoizedUser.role === "Manager" &&
        <div>
          <ShowAlldata user={memoizedUser} setUser={setUser} />
        </div>
      }
    </div>
  );
};

export default ShowData;
