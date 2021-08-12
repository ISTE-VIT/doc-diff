import Navbar3 from "../components/Projects/Navbar/Navbar3"
import Section4 from '../components/Projects/Section4/section4'; 

const Projects = () => {
return(
    <>
    <Navbar3/>
    <Section4/>
    </>
    const axios = require('axios');

// Make a request for a user with a given ID
axios.get('http://localhost:5000/projects/')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
    const axios = require('axios');

// Make a request for a user with a given ID
axios.get('http://localhost:5000/projects/project')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
    const axios = require('axios');

// Make a request for a user with a given ID
axios.get('http://localhost:5000/projects/create')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

)
};

export default Projects
