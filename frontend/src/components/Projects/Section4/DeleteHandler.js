import cookie from "react-cookies";
import axios from "../../../utils/axiosForBackend";
import { useHistory } from "react-router";

const DeleteHandler = async (id) => {
  const history = useHistory()
  const uid = cookie.load("key");
  await axios.delete(
    `/projects/delete?id=${id}&uid=${uid}`
  );
  history.push("/projects")
};

export default DeleteHandler;
