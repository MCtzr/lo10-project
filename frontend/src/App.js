import './App.css';
import Header from './views/Header';
import Navbar from './views/navbar';
import ConnexionCompte from './views/connexionCompte';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
function App() {

  return (

    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <ConnexionCompte />
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
