import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Editor from "./pages/Editor";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import { AuthProvider } from './components/context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <AuthProvider>
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
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/projects/:projectId">
            <ProjectDetail />
          </Route>
          <ProtectedRoute path="/projects" redirect="/" component={Projects} />
          <Route path="" render={props => {
            return <Redirect to="/" />
          }}
          />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
