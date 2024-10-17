
import './App.css';
import { Routes ,Route, Router } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import HomeTemplate from './Pages/HomeTemplate';
import Dashboard from './Pages/Dashboard';
import { v4 as uuidv4 } from 'uuid';

function App() {

  return (  
    <>
      <Routes>
        
      <Route path='/' element={<HomeTemplate/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>

  );
}

export default App;
