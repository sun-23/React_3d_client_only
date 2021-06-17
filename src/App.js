import "bootstrap/dist/css/bootstrap.min.css"
import { AuthProvider } from './context/AuthContext'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import PrivateRoute from './Route/PrivateRoute'

import Preview from './Page/Preview'
import Register from './Page/Register'
import Home from './Page/Home'
import Login from './Page/Login'
import Dashboard from "./Page/Dashboard";
import Contact from './Page/Contact'
import Footer from './Component/Footer'

import NavBar from "./Component/NavBar";

function App() {

  return (
      <div>
        <Router>
          <AuthProvider>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/instantqoutation" component={Preview}/>
              <Route path="/signup" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/contact" component={Contact}/>
              <PrivateRoute path="/dashboard" component={Dashboard}/>
            </Switch>
            <Footer/>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
