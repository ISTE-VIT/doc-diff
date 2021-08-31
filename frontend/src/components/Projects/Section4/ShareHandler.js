import cookie from "react-cookies";
import axios from "axios";

const ShareHandler = async (props) => { 
  const uid = cookie.load("key");
  const body = {
      id: props.projectId,
      uid: uid,
      shareable: props.shareable,
  }
  console.log(body);
  await axios.patch(
    `http://localhost:5000/projects/share`,body
  );
  window.location.href = "http://localhost:3000/projects"
};

export default ShareHandler;