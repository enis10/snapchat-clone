import React , {useRef,useCallback, useState, } from 'react'
import Webcam from 'react-webcam'
import { useDispatch , } from 'react-redux'
import { useSelector } from 'react-redux'
import { RadioButtonUnchecked } from '@material-ui/icons'
import { setCameraImage } from '../../features/cameraSlice'
import { Link, Navigate } from "react-router-dom";
import './WebcamCapture.css'
import { selectCameraImage } from '../../features/cameraSlice';
import { useNavigate } from 'react-router-dom'




const videoConstaints = {
    width: 250,
    height:400,
    facingMode: "user"
  }
  
  
function WebcamCapture() {
 
    const webcamRef = useRef(null);
    const navigate = useNavigate()
    
    const dispatch = useDispatch();
    const capture = useCallback(()=> {
        const imageSrc = webcamRef.current.getScreenshot();
       dispatch(setCameraImage(imageSrc));
       console.log("captured");
       navigate('/preview')

    },[webcamRef]);


  return (
    <div className='webcamCapture'>
      <Webcam audio ={false}
            height ={videoConstaints.height} 
            width= {videoConstaints.width} 
            ref = {webcamRef}
            videoConstraints = {videoConstaints} /> 

  
   <RadioButtonUnchecked 
   onClick = {capture} 
   className='webcamCapture_button'
   />



    </div>
  )
}

export default WebcamCapture