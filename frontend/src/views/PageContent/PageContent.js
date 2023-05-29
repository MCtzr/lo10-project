import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Musees from './MuseesComponent/MuseesResearched/Musees'
import Oeuvre from './OeuvresComponent/OeuvresComponent'
import Musee from './OneMuseeComponent/PageMusee'
import MuseesList from './MuseesComponent/MuseesComponent'

function PageContent() {

  return (
    <Router>
      <div className='navbar'>
        <nav>
          <ul>
            <li><Link to={`/artMatch/musees`}>Musees</Link></li>
            <li><Link to={`/artMatch/oeuvres`}>Oeuvre</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path='/artMatch/musees' component={Musees} >
          <MuseesList />
        </Route>
        <Route exact path='/artMatch/oeuvres' component={Oeuvre} >
          <Oeuvre />
        </Route>
        <Route exact path='/artMatch/musees/:musee' >
          <Musee />
        </Route>
      </Switch>
    </Router>
  )
}

export default PageContent