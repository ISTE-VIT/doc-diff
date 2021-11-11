import cookie from "react-cookies";
import axios from "../../../utils/axiosForBackend";

const ShareHandler = async (props) => {
  const uid = cookie.load("key");
  const body = {
    id: props.projectId,
    uid: uid,
    shareable: props.shareable,
  }
  console.log(body);
  await axios.patch(
    `/projects/share`, body
  );
  window.location.href = "/projects"
};

export default ShareHandler;