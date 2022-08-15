import { Avatar } from '@material-ui/core'
import { ImportContacts } from '@material-ui/icons';
import React from 'react'
import { StopRounded as StopRoundedIcon } from '@material-ui/icons';
import './Chat.css'
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from '../../features/appSlice';
import {db} from './../../firebase'
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



function Chat({id, username, timestamp, read, imageUrl, profilePic}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const open = () => {
    
      dispatch(selectImage(imageUrl));
      updateDoc(doc(db, 'posts', id),
      {read:true} )
      navigate('/chats/view');
    

  }


  return (
    <div onClick={open} className='chat'>
        <Avatar src ={profilePic} />
        <div className='chat_info'>
            <h4>{username}</h4>
            <p> Tap to view- <ReactTimeago date = {new Date(timestamp?.toDate()).toUTCString()} /></p>
        </div>

        {!read  && <StopRoundedIcon className='chat_readIcon'/>}
    </div>
  )
}

export default Chat;