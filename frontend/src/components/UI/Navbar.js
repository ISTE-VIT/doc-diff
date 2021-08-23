import { useHistory } from "react-router-dom";
import { logOut } from "../../services/firebase";
import ProjectModal from '../Projects/Project-Modal/ProjectModal';
import logout_icon from "../../images/logout_icon.svg";
import logo from "../../images/Logo.svg";
import cookie from "react-cookies";
import "./Navbar.css";


const Navbar = (props) => {

  let loggedin = false
  const history = useHistory();
  const key = cookie.load("key");
  if(key)
  {
      loggedin = true
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top "> 
      <a href="/" className="logo-margin">
        <img src={logo} className="logo-" alt="timemator"/>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-center navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
            <a className="nav-link dot px-5 disabled" href="/#">      ●      </a>
            {props.projects ? <a className="nav-item nav-link" href="/editor">Editor</a> : <a className="nav-item nav-link" href="#howitworks">How it works</a>}
            <a className="nav-link dot px-5 disabled" href="/#">      ●      </a>
            {props.projects ? <ProjectModal /> : <a className="nav-item nav-link" href="#aboutus">About us</a> }
        </div>
      </div>
      {props.button && ((loggedin) ? <button className="noBorder" onClick={logOut}>
        <img src={logout_icon} className="logoutBtn" alt="timemator"/>
      </button>: <><button className="nav-link btn button1 " onClick={() => history.push('/signup')}>
        Sign Up 
      </button>
      <button className="nav-link btn button2 ml" onClick={() => history.push('/login')}> 
        Login 
      </button> </>) }
    </nav>
  );
};

export default Navbar;
