import "./section2.css";
import img2 from "../../../images/img2.svg";


const section2 = () => {
  return (
    <div className="section2 " id="howitworks">
      <h1 className="blue sec2head extra-bold">How it works?</h1>
      <div className="row cards">
        <div className="col-lg-4">
        <div className="card"> 
        <img src={img2} className="card-img-top" alt="timemator"/>
            <div className="card-body">
              <h5 className="card-title">Upload your project</h5>
              <p className="card-text">
              Select the file you’re current working on
              </p>
              <button className="btn4" href="#otherresources"> Learn More</button> 

            </div>
          </div>
        </div>
        <div className="col-lg-4">
        <div className="card"> 
        <img src={img2} className="card-img-top" alt="timemator"/>
            <div className="card-body">
              <h5 className="card-title">Paste your code</h5>
              <p className="card-text">
              Select the file you’re current working on
              </p>
              <button className="btn4" href="#otherresources"> Learn More</button> 

            </div>
          </div>
        </div>
        <div className="col-lg-4">
        <div className="card"> 
        <img src={img2} className="card-img-top" alt="timemator"/>
            <div className="card-body">
              <h5 className="card-title">Compare codes</h5>
              <p className="card-text">
              Select the file you’re current working on
              </p>
              <button className="btn4" href="#otherresources"> Learn More</button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default section2;
