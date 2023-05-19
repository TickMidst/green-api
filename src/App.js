import './App.css';
import { useState } from 'react';
import { AuthorizationPage } from './components/AuthorizationPage';
import ChatSelector from './components/ChatSelector';

function App() {

  const [userAutorized, setUserAutorized] = useState(false)

  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  return ( 
    <div className='app__wrapper'>
      {userAutorized 
      ? <ChatSelector 
      idInstance={idInstance}
      apiTokenInstance={apiTokenInstance}
      /> 
      : <AuthorizationPage 
      apiTokenInstance={apiTokenInstance} 
      setApiTokenInstance={setApiTokenInstance}
      idInstance={idInstance}
      setIdInstance={setIdInstance}

      setUserAutorized={setUserAutorized} />}
    </div>
  );
}

export default App;
