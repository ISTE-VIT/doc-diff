import "./section4.css";
import cookie from "react-cookies";
import { useState } from "react";
import { Redirect } from "react-router";
import img4 from "../../../images/img4.svg";

const Body = () => {
  const uid = cookie.load("key");
  const [projects, setProjects] = useState(false);
  const requestOptions = {
    method: "GET",
  };
  fetch(`http://localhost:5000/projects/all?uid=${uid}`, requestOptions)
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      setProjects(data);
    })
    .catch((error) => {
      console.log(error);
    });

  const handleClick = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, requestOptions)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log(data.files);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="projects">
      <h1 className="blue sec2head extra-bold">Projects</h1>
      <div className="row cards">
        {projects &&
          projects.map((project) => {
            return (
              <div className="col-lg-4">
                <div
                  className="card"
                  onClick={() => { 
                    return (
                      <Redirect
                        to={{
                          pathname: "/editor",
                          state: { id: project._id },
                        }}
                      />
                    );
                  }}
                >
                  <img src={img4} className="card-img" alt="timemator" />
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Body;
