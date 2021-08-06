import { Route, Switch, Redirect} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import Editor from "./pages/Editor";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() { 
  
  return ( 
     <Router>
        <Switch>
          <Route exact path="/"  >
            <Home />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/signup"  >
            <Signup />
          </Route>  
          <Route path="/editor"  >
            <Editor />
          </Route>  
          <ProtectedRoute path="/projects" redirect="/" component={Projects} /> 
          <Route path="" render={props => {
            return <Redirect to="/" />
          }}
        />
        </Switch>
      </Router>
  );
}

export default App;
