import React from 'react'
import LoginForm from './LoginForm'

import HomeTemplate from './HomeTemplate';
import Webcapture from './Webcapture';



const Login = () => {
  return (

    <>
    {/* <Webcapture/> */}
    <div className="flex flex-col gap-20 items-center ">                                       
                       <div className="w-96 p-8 mt-14 border rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center mb-2">
                        Welcome to Sicu-aura
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                        Your one stop safety solutions using innovative technology
                        </p>
                    
                        <LoginForm/>

                    </div>
                  </div>
  </>


  )
}

export default Login