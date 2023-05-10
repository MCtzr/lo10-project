import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Page1 from './page1'
import Page2 from './page2'
import { useParams } from "react-router-dom";

function Navbar() {

  const { userId } = useParams();

  return (
    <Router>
      <div className='navbar'>
        <nav>
          <ul>
            <li><Link to={`../../artMatch/${userId}/page1`}>Page 1</Link></li>
            <li><Link to={`../../artMatch/${userId}/page2`}>Page 2</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path='/artMatch/:userId/page1' component={Page1} >
          <Page1 />
        </Route>
        <Route exact path='/artMatch/:userId/page2' component={Page2} >
          <Page2 />
        </Route>
      </Switch>
    </Router>
  )
}

export default Navbar