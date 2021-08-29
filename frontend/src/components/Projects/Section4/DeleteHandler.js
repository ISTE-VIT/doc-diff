import cookie from "react-cookies";
import axios from "axios";

const DeleteHandler = async (id) => { 
  const uid = cookie.load("key");
  await axios.delete(
    `http://localhost:5000/projects/delete?id=${id}&uid=${uid}`
  );
  window.location.href = "http://localhost:3000/projects"
};

export default DeleteHandler;
