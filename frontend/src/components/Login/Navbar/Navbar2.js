import logo from "../../../images/Logo.svg";
import "./Navbar2.css";

const Navbar = () => {
 
  return (

    <nav className="navbar navbar-expand-lg fixed-top"> 
      <a href="/" className="logo-margin">
        <img src={logo} className="logo-" alt="timemator"/>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/home">Home <span className="sr-only">(current)</span></a>
            <a className="nav-link dot px-5 disabled" href="/#" >      ●      </a>
            <a className="nav-item nav-link" href="/#howitworks">How it works</a>
            <a className="nav-link dot px-5 disabled" href="/#">      ●      </a>
            <a className="nav-item nav-link" href="/#aboutus">About us</a>  
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
