import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import logo from '../Assets/logo.png'
import sicuauralogo from '../Assets/sicu-aura_logo-removebg 2.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
  return (
    <nav className="bg-[#201A31] text-white py-1">
      <div className="container mx-auto flex justify-between items-center">
 
         <div className='flex'>
            
            <img src={logo} alt="" className='w-12'/>
            <img src={sicuauralogo} className='w-[180px] object-cover ' />
     
       </div>
       
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80"
            alt="User"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="mr-4">Alex Robinson</span>
          <button
          onClick={()=>navigate("/")}
          className="flex items-center bg-[#302A41] opacity-80 hover:opacity-100 px-3 py-1 rounded">
            <LogOut className="w-4 h-4 mr-1" />
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;