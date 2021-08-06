import logo from "../../../images/Logo.svg";
import "./Navbar3.css";
import logout_icon from "../../../images/logout_icon.svg";


const Navbar3 = () => {

  return (

    <nav className="navbar navbar-expand-lg fixed-top"> 
      <a href="/" className="logo-margin">
        <img src={logo} className="logo-" alt="timemator"/>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-icon">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/" >Home</a>
            <a className="nav-link dot px-5 disabled" href="/#" >      ●      </a>
            <a className="nav-item nav-link" >Editor</a>
            <a className="nav-link dot px-5 disabled" href="/#">      ●      </a>
            <a className="nav-item nav-link" >Projects</a>  
          </div>
        
          <a href="/" >
        <img src={logout_icon} className="logo-two" alt="timemator"/>
      </a>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar3;