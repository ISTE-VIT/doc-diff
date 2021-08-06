import "./section4.css";
import img4 from "../../../images/img4.svg";

const section4 = () => {
  return (
    <div className="section4">
      <div className="section4-in">
        <h1 className="blue sec2head extra-bold">Projects</h1>
        <div className="row cards">
          <div className="col-lg-4">
            <div className="card">
              <img src={img4} className="card-img-top" alt="timemator" />
              <div className="card-body">
                <h5 className="card-title">Project Name</h5>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <img src={img4} className="card-img-top" alt="timemator" />
              <div className="card-body">
                <h5 className="card-title">Project Name</h5>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <img src={img4} className="card-img-top" alt="timemator" />
              <div className="card-body">
                <h5 className="card-title">Project Name</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <img src={img4} className="card-img-top" alt="timemator" />
              <div className="card-body">
                <h5 className="card-title">Project Name</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <img src={img4} className="card-img-top" alt="timemator" />
              <div className="card-body">
                <h5 className="card-title">Project Name</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <img src={img4} className="card-img-top" alt="timemator" />
              <div className="card-body">
                <h5 className="card-title">Project Name</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default section4;
