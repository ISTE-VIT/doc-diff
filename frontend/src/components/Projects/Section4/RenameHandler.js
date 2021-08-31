import cookie from "react-cookies";
import axios from "axios";

const RenameHandler = async (props) => { 
  const uid = cookie.load("key");
  const body = {
      id: props.projectId,
      uid: uid,
      projectName:props.name
  }
  console.log(body);
  await axios.patch(
    `http://localhost:5000/projects/updatename`,body
  );
  window.location.href = "http://localhost:3000/projects"
};

export default RenameHandler;