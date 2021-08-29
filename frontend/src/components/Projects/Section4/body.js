import { useState, useEffect } from "react";
import cookie from "react-cookies";
import img5 from "../../../images/22.jpg";
import delicon from "../../../images/delete.png";
import editicon from "../../../images/edit.png";
import linkicon from "../../../images/link.png";
import ConfirmationModal from "../../UI/ConfirmationModal";
import DeleteHandler from "./DeleteHandler.js";
import "./section4.css";

const Body = () => {
  const uid = cookie.load("key");
  const [projects, setProjects] = useState(false);
  const [projectId,setProjectId] = useState("");
  const [error, setError] = useState(null); 

  const requestOptions = {
    method: "GET",
  };

  useEffect(() => {
    fetch(`http://localhost:5000/projects/all?uid=${uid}`, requestOptions)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (id) => {
    cookie.save("id", id, { path: "/" });
    window.location.href = `http://localhost:3000/projects/${id}`;
  };

  const errorHandler = () => {
    setError(null);
}

  return (
    <>
      {error && (
        <ConfirmationModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler} 
          onDelete={() => { 
            DeleteHandler(projectId);
          setError(null)}}
        />
      )}
      <div className="projects">
        <h1 className="blue sec2head extra-bold">Projects</h1>
        <div className="row cards">
          {projects &&
            projects.map((project) => {
              let id = project._id;
              return (
                <div className="col-lg-4">
                  <div
                    className="card"
                    // onClick={() => {
                    //   handleClick(id);
                    // }}
                  >
                    <div className="container">
                      <div className="overlay btnGrp">
                        <button
                          className="projectBtn"
                          onClick={() => { 
                            setProjectId(id);
                            console.log(projectId);
                            setError({
                              title:"Are you sure you want to delete this Project ?",
                              message: "You wont be able to recover this.",
                            });
                          }}
                        >
                          <img
                            src={delicon}
                            className="overlayIcons"
                            alt="timemator"
                          />
                        </button>
                        <button
                          className="projectBtn"
                          onClick={() => {
                            window.location.href = `http://localhost:3000/projects/${id}`;
                          }}
                        >
                          <img
                            src={editicon}
                            className="overlayIcons"
                            alt="timemator"
                          />
                        </button>
                        <button className="projectBtn">
                          <img
                            src={linkicon}
                            className="overlayIcons"
                            alt="timemator"
                          />
                        </button>
                      </div>
                      <img src={img5} className="card-img" alt="timemator" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{project.name}</h5>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Body;
