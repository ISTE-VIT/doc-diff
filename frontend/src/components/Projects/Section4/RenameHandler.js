import cookie from "react-cookies";
import axios from "../../../utils/axiosForBackend";

const RenameHandler = async (props) => {
  const uid = cookie.load("key");
  const body = {
    id: props.projectId,
    uid: uid,
    projectName: props.name
  }
  console.log(body);
  await axios.patch(
    "/projects/updatename", body
  );
  window.location.href = "/projects"
};

export default RenameHandler;