import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { ChatBubble as ChatBubbleIcon } from '@material-ui/icons'
import { db } from '../../firebase'
import { onSnapshot, collection, Timestamp } from 'firebase/firestore'
import { query, orderBy } from 'firebase/firestore'
import './Chats.css'
import Chat from '../Chat/Chat'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/appSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { RadioButtonUnchecked as RBU } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { resetCameraImage } from '../../features/cameraSlice'
function Chats() {

    const [posts, setPosts] = useState()
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
   

    useEffect(  () => {
      const collectionRef = collection(db, "posts");
      const q = query(collectionRef,orderBy("timestamp", "desc"));
      onSnapshot(q, ( snapshot)=>
      { setPosts(snapshot.docs.map(doc =>({... doc.data(), id: doc.id})));  })
    },[]);

    // functions

    const takeSnap = () => {
        dispatch(resetCameraImage)
        navigate('/')
    }
  

  return (
    <div className='chats'>
        <div className='chats_header'>
        <Avatar  src = {user.profilePic} className = "chat_avatar"  onClick = {() => signOut(auth)}/>

        <div className='chats_search'>
            <SearchIcon className='chats_icon' />
            <input placeholder = "Friends" type = "text"/>
        </div>
        <ChatBubbleIcon className = "chats_chatIcon"/>
        </div>

        <div className='chat_posts'>
        {posts?.map(p => <Chat key = {p.id} 
        id  = {p.id}
        timestamp = {p.timestamp} imageUrl = {p.imageUrl}
          username = {p.username} read = {p.read}
        />)}
          
        </div>
        <RBU
         className='chats_takePicIcon'
         onClick = {takeSnap}
         fontSize = 'large'
/>

    </div>
  )
}

export default Chats