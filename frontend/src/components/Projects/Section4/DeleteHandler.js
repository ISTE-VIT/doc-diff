import cookie from "react-cookies";
import axios from "axios";


const DeleteHandler = (id) => {
    let body;
    console.log(":HIIII");
    const uid = cookie.load("key");
    body = {uid,id}
    axios.post("http://localhost:5000/projects/delete", body).then((res) => {
        console.log(res);
    });
}

export default DeleteHandler