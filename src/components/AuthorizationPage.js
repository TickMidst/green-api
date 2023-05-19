import './AuthorizationPage.css'
import axios from 'axios'

export const AuthorizationPage = ({ apiTokenInstance, setApiTokenInstance, idInstance, setIdInstance, setUserAutorized }) => {
  const autorization = async (idInstance, apiTokenInstance) => {
    try {
      const url = `https://api.green-api.com/waInstance${idInstance}/setSettings/${apiTokenInstance}`;
      const headers = {
        'Content-Type': 'application/json'
      };
      const response = await axios.post(url, headers);
      if (response.data.saveSettings) {
        setUserAutorized(true)
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeChange = (e) => {
    setIdInstance(e.target.value);
  };

  const handleTokenChange = (e) => {
    setApiTokenInstance(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    autorization(idInstance, apiTokenInstance)
  };

  return (
    <div className='authorizationPage_wrapper'>
      <div className="authorizationPage__input_wrapper">
        <h2>Введите IdInstance и ApiTokenInstance <br /> для продолжения работы</h2>
        <div className='autorization__input'>
          <form className='autorization__input-form' onSubmit={handleSubmit}>
            <label>
              IdInstance:
              <input className='autorization__input-form-idInstance' type="text" value={idInstance} onChange={handleCodeChange} />
            </label>
            <br />
            <label>
              ApiTokenInstance:
              <input className='autorization__input-form-apiTokenInstance' type="text" value={apiTokenInstance} onChange={handleTokenChange} />
            </label>
            <br />
            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
};