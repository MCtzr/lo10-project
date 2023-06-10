import './App.css';
import MyRouter from './views/myRouter'
import { MyContextProvider } from './components/Credentials/CredentialGlobal';
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <MyContextProvider>
      <ToastContainer />
      <MyRouter />
    </MyContextProvider>
  );
}

export default App;
