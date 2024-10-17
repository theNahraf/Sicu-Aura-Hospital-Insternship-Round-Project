import React, { useState } from 'react'
import Webcam from 'react-webcam'
import { useRef } from 'react'
import toast from 'react-hot-toast'

const Webcapture = ({onCapture}) => {
  const[image ,setImage] = useState(null);
    const webRef = useRef(null);
    const[showcamera, setShowCamera] =useState(true);
    
    const showImage = async()=>{
      try{
        let img = await webRef.current.getScreenshot();   
        setShowCamera(false);
        setImage(img);
        onCapture(img);
        // console.log("oncapture -> ", onCapture);
        // console.log("image is this",img);
      }
      catch(error){
        console.log("error in web cam ", error);
        
      }
    }

  return (
    <div className='flex flex-col items-center'>
      {
        showcamera ? (
          <Webcam className='w-[20rem]' ref={webRef} mirrored={true} />
        )
        : (<img src={image}/>)
      }
      {/* <Webcam className='w-[20rem]' ref={webRef} mirrored={true} /> */}
      {
        showcamera ? (
          <button 
          onClick={()=>{
              showImage();
          }}
          className="px-4 bg-black text-white mt-4 py-2 rounded-md"
          >
              Capture and Login
          </button >
        ) : (
          
          <>
          <button 
          className="px-4 bg-black text-white py-2 rounded-md"
          onClick={()=>setShowCamera(true)}>take again </button>

          </>
        )
      }
    {/* <button 
    onClick={()=>{
        showImage();
    }}
    >
        Click for Capture
    </button > */}
    {/* <img src={image} alt="" /> */}
    </div>


  )
}

export default Webcapture