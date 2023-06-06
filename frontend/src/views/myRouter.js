import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../App.css';
import Header from './PageContent/Header';
import Navbar from './PageContent/PageContent';
import ModifyProfil from './PageModify/ModifyProfil';
import ConnexionCompte from './PageConnexion/ConnexionCompte';
import useExpressService from '../services/expressService';

function MyRouter() {

  const expressService = useExpressService();

  window.addEventListener('beforeunload', () => {
    document.documentElement.scrollTop = 0;

  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/modifyProfil">
            <ModifyProfil expressService={expressService} />
          </Route>
          <Route path="/artMatch">
            <Header />
            <Navbar />
            <div>{/* Ajoutez votre contenu spécifique ici */}</div>
          </Route>
          <Route exact path="/login">
            <ConnexionCompte expressService={expressService} />
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