import '../App.css';


import { BrowserRouter,Route,Routes } from 'react-router-dom';

import ShowForm from '../Components/signin register/ShowForm';
import Signin from '../Components/signin register/Signin';
import Register from '../Components/signin register/Register';
import ShowdataUser from '../Components/ShowData/ShowdataUser'
 
function Routerwork() {
  return (
    <>
    <BrowserRouter>
    <div className='row5' > 
</div> 
    <Routes>
    <Route path='/' element={<ShowForm/>}/>
    
    <Route path='/signin' element={(<Signin />)}/>
    <Route path='/register' element={(<Register />)}/>
    <Route path='/showuser' element={(<ShowdataUser />)} />

   
    </Routes>


    
    </BrowserRouter>
  
 

  
    
    
    
    </>
  );
}

export default Routerwork;
