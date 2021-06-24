import "bootstrap/dist/css/bootstrap.min.css"
import { AuthProvider } from './context/AuthContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//route
import PrivateRoute from './Route/PrivateRoute'

//page
import Preview from './Page/Preview'
import Register from './Page/Register'
import Home from './Page/Home'
import Login from './Page/Login'
import Dashboard from "./Page/Dashboard"
import Contact from './Page/Contact'
import ForgotPassword from './Page/ForgotPassword'
import UpdateProfile from './Page/UpdateProfile'
import Page404 from "./Page/404"
import Cart from "./Page/Cart"

//component
import Footer from './Component/Footer'
import NavBar from "./Component/NavBar";

function App() {

  return (
      <div style={{fontFamily: "Mitr, sans-serif"}}>
        <Router>
          <AuthProvider>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/instantqoutation" component={Preview}/>
              <Route path="/signup" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/dashboard" component={Dashboard}/>
              <PrivateRoute path="/update-profile" component={UpdateProfile}/>
              <PrivateRoute path="/cart" component={Cart}/>
              <Route path="*" component={Page404}/>
            </Switch>
            <Footer/>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
