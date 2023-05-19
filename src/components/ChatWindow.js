import './ChatWindow.css';
import sendMessage_icon from '../assets/images/send-message.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import user_icon from '../assets/images/user-icon.png';

function ChatWindow({idInstance, apiTokenInstance, userPhoneNumber}) {

  useEffect(() => {
    const interval = setInterval(() => {
      recieveMessage(idInstance, apiTokenInstance)
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const [listOfAllMessages, setListOfAllMessages] = useState([])
  const [newInputMessage, setNewInputMessage] = useState('')
  const handleNewMessageInputChange = (event) => {
  setNewInputMessage(event.target.value);
  };
  const handleKeyDownMessageInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(idInstance, apiTokenInstance, newInputMessage, userPhoneNumber)
      setNewInputMessage('')
    }
  };
  const handleSendMessageButton = () => {
    sendMessage(idInstance, apiTokenInstance, newInputMessage, userPhoneNumber)
    setNewInputMessage('')
  };
  const sendMessage = async (idInstance, apiTokenInstance, message, chatId) => {
    try {
      const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
      const headers = {
        'Content-Type': 'application/json'
      };
      const body = {
        chatId: `${chatId}@c.us`,
        message: message
      };
      const response = await axios.post(url, body, headers);
      if (response.data.idMessage) {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = hours + ':' + minutes;
        let newMessageToList = {text: newInputMessage, status: 'sent', time: formattedTime}
       setListOfAllMessages(prevMessages => [...prevMessages, newMessageToList])
      };
      recieveMessage(idInstance, apiTokenInstance)
    } catch (error) {
      console.error(error);
    }
  };  
  const recieveMessage = async (idInstance, apiTokenInstance) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;
    axios.get(url).then(response => { 
      if (response.data) {
        if (response.data.body.typeWebhook === 'incomingMessageReceived' && response.data.body.messageData.typeMessage === 'textMessage') {
          const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = hours + ':' + minutes;
          let newMessageToList =  {text: response.data.body.messageData.textMessageData.textMessage, status: 'recieved', time: formattedTime}
          setListOfAllMessages(prevMessages => [...prevMessages, newMessageToList])
        }
        deleteNotification(idInstance, apiTokenInstance, response.data.receiptId)
      }
    })
    .catch(error => {
      console.error(error);
    });
    };  
    const deleteNotification = async (idInstance, apiTokenInstance, receiptId) => {
    try {
      const url = `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;
      const response = await axios.delete(url);
      if (response.data.result) {
        console.log(`сообщение ${receiptId} удалено`)
      };
    } catch (error) {
      console.error(error);
    }
  }
 
  return (
      <div className='chat__window'>
        <header className='chat__window_header header'>
          <img className='chat__window_header-profile-pic'  src={user_icon}></img>
          <h3 className='chat__window_header-profile-title' >
            {userPhoneNumber}
          </h3>
        </header>
        <div className='chat__window_messages'>
          {listOfAllMessages.map((e) => {
            return (
              <div className={`chat__window-message_bubble chat__window-message_bubble-${e.status}`}>
                <p>{e.text}</p>
                 <time className='chat__window-message_bubble-time'>{e.time}</time>
              </div>)
          })}
        </div>
        <div className='chat__window_newMessage'>
          <input type='text' onKeyDown={handleKeyDownMessageInput} onChange={handleNewMessageInputChange} value={newInputMessage}  className='chat__window_newMessage-input' placeholder='Введите сообщение'>
          </input>
          <input type='image' onClick={handleSendMessageButton} className='chat__window_newMessage-sendMessage' src={sendMessage_icon}>
          </input>
        </div>
      </div>
  );
}

export default ChatWindow;