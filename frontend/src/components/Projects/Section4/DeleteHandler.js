import cookie from "react-cookies";
import axios from "../../../utils/axiosForBackend"; 

const DeleteHandler = async (id) => { 
  const uid = cookie.load("key");
  await axios.delete(
    `/projects/delete?id=${id}&uid=${uid}`
  ); 
  window.location.href = "/projects";
};

export default DeleteHandler;
