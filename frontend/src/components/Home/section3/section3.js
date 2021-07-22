import "./section3.css";
import img3 from "../../../images/img3.svg";
import wave from "../../../images/wave.svg";
import linkedin from "../../../images/linkedin.svg";
import mail from "../../../images/mail.svg";
import youtube from "../../../images/youtube.svg";
import facebook from "../../../images/facebook.svg";
import twitter from "../../../images/twitter.svg";
import instagram from "../../../images/instagram.svg";


const section3 = () => {
  return (
    <>
      <div className="section3 " id="aboutus">
        <h1 className="blue sec2head extra-bold">About Us</h1>
        <div className="row">
          <div className="col-lg-6 sec3txt">
            <p className="txt">Indian Society for Technical Education or ISTE is a national, professional, non-profit making Society registered under the Societies Registration Act of 1860. The major objective of ISTE is to assist and contribute to the production and development of top-quality professional engineers and technicians required by industries and other organizations.</p>
          </div>
          <div className="col-lg-6">
            <img src={img3} className="container img3" alt="timemator" />
          </div>
        </div>
      </div>
      <div className="footer">
        <img src={wave} className="wave" alt="timemator" />
        <div className="icons" >
          <a className="icon" href="/">
            <img src={mail} />
          </a>
          <a className="icon" href="/">
            <img src={facebook} />
          </a>
          <a className="icon" href="/">
            <img src={twitter} />
          </a>
          <a className="icon" href="/">
            <img src={instagram} />
          </a>
          <a className="icon" href="/">
            <img src={youtube} />
          </a>
          <a className="icon" href="/">
            <img src={linkedin} />
          </a>
        </div>
        </div>
    </>
  );
};

export default section3;

