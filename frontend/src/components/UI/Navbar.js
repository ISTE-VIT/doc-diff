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
        <img src={logo} className="logo-" alt="doc-diff"/>
      </a>
      <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-center navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
            </li > 
              <a className="nav-link dot disabled " href="/#">      ●      </a> 
            <li className="nav-item">
              {props.projects ? <a className="nav-item nav-link" href="/editor">Editor</a> : <a className="nav-item nav-link" href="/#howitworks">How it works</a>}
            </li> 
              <a className="nav-link dot disabled" href="/#">      ●      </a> 
            <li className="nav-item">
              {props.projects ? <ProjectModal /> : <a className="nav-item nav-link" href="/#aboutus">About us</a> }
            </li>
            {props.button && ((loggedin) ? 
              <li className="nav-end navbar-right">
                <button className="noBorder" onClick={logOut}>
                  <img src={logout_icon} className="logoutBtn" alt="doc-diff"/>
                </button>
              </li>
              : 
              <>
              <li className="nav-item navbar-right">
                <button className="nav-link btn button1 collapse-hide effect" onClick={() => history.push('/signup')}>
                  Sign Up 
                </button>
                <button className="blue collapse-show noBorder" onClick={() => history.push('/signup')}>
                  Sign Up 
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn button2 ml collapse-hide effect" onClick={() => history.push('/login')}> 
                  Login 
                </button> 
                <button className="blue collapse-show noBorder" onClick={() => history.push('/login')}> 
                  Login 
                </button> 
              </li>
              </>
              ) }
              </ul> 
      </div>
    </nav>
  );
};

export default Navbar;
