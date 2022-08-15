import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCameraImage, selectCameraImage } from '../../features/cameraSlice'
import './Preview.css'
import { useNavigate } from 'react-router-dom'
import { Close, Collections, Create, Send } from '@material-ui/icons'
import {  TextFields } from '@mui/icons-material'
import { Note } from '@material-ui/icons'
import { MusicNote } from '@material-ui/icons'
import { AttachFile } from '@material-ui/icons'
import { Crop } from '@material-ui/icons'
import { Timer } from '@material-ui/icons'
import {storage,db} from './../../firebase'
import {ref, uploadString} from "firebase/storage"
import { getDownloadURL } from 'firebase/storage'
import { serverTimestamp, addDoc, collection} from "firebase/firestore";


import { v4 as uuid } from 'uuid'
import { selectUser } from '../../features/appSlice'


function Preview() {
    const cameraImage  = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)


   useEffect ( () => {
    if(!cameraImage){
      navigate('/cam') // when the image is null go back to cam
    }
   },[cameraImage, navigate]);

const closePreview = () => {
       dispatch(resetCameraImage)
       navigate('/cam')
}
const sendPost = ()=>{

   const id = uuid();
   const storageRef = ref(storage, `/posts/${id}`)
   const time = serverTimestamp()
  

   const uploadTask = uploadString(storageRef,cameraImage,'data_url').then(()=> {
    getDownloadURL(storageRef).then(url => {
      addDoc(collection(db, "posts"), {
        imageUrl:url,
        read:false,
        username: user.username,
        prfilePic: user.profilePic,
        timestamp: time,
      }).then(
     
        console.log('saved')
      )
       navigate('/chats')
    })
   })

};


  return (

    <div className='preview'>
        <Close className='preview_close' onClick = {closePreview}/> {/* Close Icon */}
        <div className='preview_toolbarRight'>
          <TextFields/>
          <Create/>
          <Note/>
          <MusicNote/>
          <AttachFile/>
          <Crop/>
          <Timer/>
        </div>
        <img   src = {cameraImage} alt = "captured"/>
        <div  onClick = {sendPost} className='preview_footer'>
        <h2>Send Now</h2>
        <Send  className='previewsendIcon'/>
        </div>
 
    </div>
  )
}

export default Preview