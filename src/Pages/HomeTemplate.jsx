import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import textlogo from '../Assets/sicu-aura_logo-removebg 2.png'
import medicalLogo from '../Assets/medical sign.png'
import Login from './Login';
import Signup from './Signup';
import LoginForm from './LoginForm';

const HomeTemplate = () => {
    const[signup , setSignup] = useState(false);
  return (
    <>
    <div className="flex gap-20 min-h-screen  ">
                  <div className="w-[40%] bg-cover bg-center bg-rectangle flex flex-col items-center justify-center p-10" 
                  >
                      <div>
                          <img src={logo} alt="Logo with a man and woman silhouette inside a shield" className="w-48 h-48"/>
                      </div>
                      <div className=" mt-4">
                        <img src={textlogo} alt="" />
                      </div>
                      <p className="text-white text-2xl mt-2">Feel <span className="text-green-500">Safe</span> Everywhere</p>
                      <p className="text-white text-xl mt-2">#Safe-<span className='text-green-500 font-extrabold'>T</span>-Fast</p>
                  </div>
                  <div className="w-1/2 relative bg-white p-10 mt-11">
                      <div className="absolute top-0 -left-12">
                          <img src={medicalLogo} alt="Medical symbol" className="w-[100px] h-[100px]"/>
                      </div>
                      <div className="flex justify-center ">
                          <Link className={`text-3xl font-semibold ${signup ? "text-gray-800" : "text-gray-400"}`} 
                          onClick={()=>setSignup(true)}
                          >Sign Up</Link>
                          <h2 className={`text-3xl font-semibold text-gray-400 ml-2 `} >/</h2>
                          <Link
                           onClick={()=>setSignup(false)}
                          className={`text-3xl font-semibold text-gray-400 ml-2 ${signup ? "text-gray-400": "text-gray-800"}`}  >Login</Link>
                      </div>    
                        <div>
                            {
                                signup ? (<Signup setSignup={setSignup}/>) : (<LoginForm/>)
                            }
                        </div>
                  
                      <div className="mt-4 text-center text-gray-500">
                          <p>Terms and Condition privacy policy</p>
                      </div>
                  </div>
              </div>
  </>
  )
}

export default HomeTemplate