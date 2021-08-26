import { useState, useEffect } from "react";
import cookie from "react-cookies";
import { useEffect, useState } from "react";  
import img5 from "../../../images/22.jpg";
 

const Body = () => {
  const uid = cookie.load("key");
  const [projects, setProjects] = useState(false); 
  const requestOptions = {
    method: "GET",
  }; 

  useEffect(()=> {
    fetch(`http://localhost:5000/projects/all?uid=${uid}`, requestOptions)
  .then((response) => {   
    console.log("abhi")
    const data = response.json();
    return data;
  })
  .then((data) => { 
      console.log(data)
      setProjects(data); 
    })
    .catch((error) => {
      console.log(error);
    }); 
  },[])
  
  

  const handleClick = (id) => {
    cookie.save("id", id, { path: "/" });   
    window.location.href = "http://localhost:3000/editor" 
  };
 
 
  return (
    <div className="projects">
      <h1 className="blue sec2head extra-bold">Projects</h1>
      <div className="row cards">
        {projects &&
          projects.map((project) => {
            let id = project._id  
            console.log(project.name)
            return (
              <div className="col-lg-4">
                <div className="card" onClick={() => {handleClick(id)}}>
                  <img src={img5} className="card-img" alt="timemator" />
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
