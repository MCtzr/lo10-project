import './App.css';
import MyRouter from './views/myRouter'
import { MyContextProvider } from './components/Credentials/CredentialGlobal';


function App() {


  return (
    <MyContextProvider>
      <MyRouter />

    </MyContextProvider>
  );
}

export default App;
