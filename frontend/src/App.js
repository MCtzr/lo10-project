import './App.css';
import Header from './views/PageContent/Header';
import Navbar from './views/PageContent/PageContent';
import ModifyProfil from './views/PageModify/ModifyProfil';
import ConnexionCompte from './views/PageConnexion/ConnexionCompte';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
function App() {

  window.addEventListener('beforeunload', () => {
    document.documentElement.scrollTop = 0;
  });

  return (

    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <ConnexionCompte />
          </Route>
          <Route exact path="/artMatch/:userId/modify">
            <ModifyProfil />
          </Route>
          <Route path="/artMatch/:userId">
            <Header />
            <Navbar />
            <div>
            </div>
          </Route>
          <Route exact path="">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>

    </Router>

  );
}

export default App;
