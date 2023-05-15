import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Musees from './MuseesComponent/MuseesResearched/Musees'
import Oeuvre from './OeuvresComponent/OeuvresComponent'
import Musee from './OneMuseeComponent/PageMusee'
import { useParams } from "react-router-dom";
import Page1 from './MuseesComponent/MuseesComponent'

function PageContent() {

  const { userId } = useParams();

  return (
    <Router>
      <div className='navbar'>
        <nav>
          <ul>
            <li><Link to={`/artMatch/${userId}/musees`}>Musees</Link></li>
            <li><Link to={`/artMatch/${userId}/oeuvres`}>Oeuvre</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path='/artMatch/:userId/musees' component={Musees} >
          <Page1 />
        </Route>
        <Route exact path='/artMatch/:userId/oeuvres' component={Oeuvre} >
          <Oeuvre />
        </Route>
        <Route exact path='/artMatch/:userId/musees/:musee' >
          <Musee />
        </Route>
      </Switch>
    </Router>
  )
}

export default PageContent