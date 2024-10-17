import React from 'react'
import SignupForm from './SignupForm'
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import textlogo from '../Assets/sicu-aura_logo-removebg 2.png'
import medicalLogo from '../Assets/medical sign.png'
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import HomeTemplate from './HomeTemplate';


const Signup = ({setSignup}) => {

  const location = useLocation();

  
  return (
    <>
    <div className="flex flex-col gap-20 ">
             <SignupForm setSignup={setSignup}/>
    </div>
  </>
  )
}

export default Signup