import cookie from "react-cookies";
import axios from "axios";


const DeleteHandler = (id) => {
    let body; 
    const uid = cookie.load("key");
    axios.delete(`http://localhost:5000/projects/delete?id=${id}&uid=${uid}`)
}

export default DeleteHandler