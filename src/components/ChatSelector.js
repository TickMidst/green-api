import './ChatSelector.css';
import addChat_icon from '../assets/images/add-chat.svg';
import user_icon from '../assets/images/user-icon.png';
import { useState } from 'react';
import ChatWindow from './ChatWindow';

function ChatSelector({ idInstance, apiTokenInstance }) {

  const [userPhoneNumber, setUserPhoneNumber] = useState('')
  const [chat, setChat] = useState([])
  const [numberToSearch, setNumberToSearch] = useState('')
  const [phoneNumberInputClassName, setPhoneNumberInputClassName] = useState('chat__selector_search-input')

  const handleNumberToSearchInputChange = (event) => {
    setPhoneNumberInputClassName('chat__selector_search-input')
    setNumberToSearch(event.target.value);
  };

  const isPhoneNumberValid = (number) => {
    return /^\d{11}$/.test(number)
  }

  const isSearchDisabled = () => {
    if (chat.length >= 1) {
      return true
    } else {
      return false
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isPhoneNumberValid(numberToSearch)) {
        setChat([...chat, numberToSearch])
        setUserPhoneNumber(numberToSearch)
      } else {
        setPhoneNumberInputClassName('chat__selector_search-input chat__selector_search-input-invalid')
      }
    }
  };

  const handleAddUserButtonClick = () => {
    if (isPhoneNumberValid(numberToSearch)) {
      setChat([...chat, numberToSearch])
      setUserPhoneNumber(numberToSearch)
      setNumberToSearch('');
    } else {
      setPhoneNumberInputClassName('chat__selector_search-input chat__selector_search-input-invalid')
    }

  };

  return (
    <div className='chatSelectorPage__wrapper'>
      <div className='chat__selector'>
        <header className='chat__selector-header header'>
        </header>
        <div className='chat__selector-search'>
          <input
            type='search'
            disabled={isSearchDisabled()}
            onKeyDown={handleKeyDown}
            value={numberToSearch}
            onChange={handleNumberToSearchInputChange}
            id="searchUserInput"
            className={phoneNumberInputClassName}
            placeholder='Введите номер пользователя в формате 7**********'>
          </input>
          <input
            type='image'
            disabled={isSearchDisabled()}
            id="addUserButton"
            onClick={handleAddUserButtonClick}
            className='chat__selector-addUser'
            src={addChat_icon}>
          </input>
        </div>
        <div className='chat__selector-chats_list'>
          {chat.map((e) => {
            return <div className='chat__selector-chat_preview'>
              <img className='chat__selector-chat_preview_userAvatar'
                src={user_icon}></img>
              <div><h5 className='chat__selector-chat_preview_title'>{e}</h5>
              </div>
            </div>
          })}

        </div>
      </div>
      {chat.length > 0
        ? <ChatWindow idInstance={idInstance} apiTokenInstance={apiTokenInstance} userPhoneNumber={userPhoneNumber} />
        : <div className='chatsPage__windowPlug'></div>}
    </div>
  );
}

export default ChatSelector;