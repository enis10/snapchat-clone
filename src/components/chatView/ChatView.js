import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './ChatView.css'
import { selectSelectedImage } from '../../features/appSlice';
import { ExitToApp } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { CountdownCircleTimer} from 'react-countdown-circle-timer';

function ChatView() {


  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();

  const exit = () => {
    navigate('/chats', { replace: true });
  };


  return (
    <div className='chatView'>
    <img src = {selectedImage} alt = "selectedImage" onClick = {exit} />
    <div className= 'chatView_timer'>
    <CountdownCircleTimer
    isPlaying
    duration={10}
    size= {50}
    strokeWidth= {6}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
    </div>

    </div>
  )
}

export default ChatView