
import axios from 'axios';

const apiUrls = process.env.REACT_APP_API_NEXT_PUBLIC_SERVER_URL;

const getUser = async () => {
  try {

    const response = await axios.get(`${apiUrls}/user/viewspecificuser/${localStorage.getItem('_id')}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
   
    window.alert(error.response.data.message) 
  }
};

export default getUser;
