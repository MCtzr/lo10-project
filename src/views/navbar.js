import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Page1 from './page1'
import Page2 from './page2'

function Navbar() {
  return (
    <Router>
      <div className='navbar'>
        <nav>
          <ul>
            <li><Link to="/page1">Page 1</Link></li>
            <li><Link to="/page2">Page 2</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path="/page1">
          <Page1 />
        </Route>
        <Route path="/page2">
          <Page2 />
        </Route>
      </Switch>
    </Router>
  )
}

export default Navbar