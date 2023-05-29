import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../App.css';
import Header from './PageContent/Header';
import Navbar from './PageContent/PageContent';
import ModifyProfil from './PageModify/ModifyProfil';
import ConnexionCompte from './PageConnexion/ConnexionCompte';

function MyRouter() {

  window.addEventListener('beforeunload', () => {
    document.documentElement.scrollTop = 0;

  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/modifyProfil">
            <ModifyProfil />
          </Route>
          <Route path="/artMatch">
            <Header />
            <Navbar />
            <div>
            </div>
          </Route>
          <Route exact path="/login">
            <ConnexionCompte />
          </Route>
          <Route exact path="">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default MyRouter;
