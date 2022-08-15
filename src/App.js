import React, { useEffect } from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import WebcamCapture from './components/webCamCapture/WebcamCapture';
import Preview from './components/preview/Preview';
import { serverTimestamp, addDoc, collection} from "firebase/firestore";
import Chats from './components/chats/Chats';
import { db } from './firebase';
import View from './components/view/View'
import ChatView from './components/chatView/ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import Login from './components/login/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { login, logout } from './features/appSlice';




function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();



  useEffect(() => {

    onAuthStateChanged(auth,
      (authUser)=>{
        if(authUser){
          dispatch(login(
            {username: authUser.displayName,
            profilePic: authUser.photoURL,
            id:authUser.uid}
          ))
         
         
        }else{
          dispatch(logout())
        }
      } )

  },[])


  return (
    <div className="app">

   {!user?
    (
      <Login/>
    )
    :
    (
      <div className='bodyapp'>
      <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt=""/>

      <div className='bodyBackground'> 
      <div className='app_body'>
      <Routes>
     <Route path="/" element={<WebcamCapture/>}/>
     <Route path="/preview" element={<Preview/>}/>
     <Route path = "/chats" element = {<Chats/>} />
     <Route path='/chats/view' element = {<ChatView/>} />
     </Routes> </div>
     </div>
     </div>
    )
  }
     
  
     
    </div>
  );
}

export default App;
