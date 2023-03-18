import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Page1 from './page1'
import Page2 from './page2'

const Navbar = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/page1">Page1</Link>
          </li>
          <li>
            <Link to="/page2">Page2</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/page1">
          <Page1 />
        </Route>
        <Route path="/page2">
          <Page2 />
        </Route>
      </Switch>
    </Router>
  );
}
export default Navbar