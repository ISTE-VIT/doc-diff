import "./section1.css";
import img1 from "../../../images/img1.svg"; 
import {Link} from "react-router-dom"

const Section1 = () => {
  return (
    <div className="row section1 " id="home">
      <div className="col-lg-5">
        <h1 className="extra-bold">Doc Diff</h1>
        <h3 className="blue">By ISTE-VIT</h3>
        <h3 className="txt">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h3>
        <Link to="/editor"><button className="btn3 effect" >
          Go to the Editor
        </button>
        </Link>
      </div>
      <div className="col-lg-6">
        <img src={img1} className="container img1" alt="timemator" />
      </div>
    </div>
  );
};

export default Section1;
