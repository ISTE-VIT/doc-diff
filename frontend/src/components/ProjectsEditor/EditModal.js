import cookie from "react-cookies";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import axios from "../../utils/axiosForBackend";
import { useHistory } from "react-router";


const EditModal = (props = { body: {} }) => {
    const [error, setError] = useState(null);
    const history = useHistory()
    const handleClick = async () => {
        const key = cookie.load("key");
        if (key) { 
            await axios.patch("/projects/updatefiles", props.body).then((res) => {
            });
            history.push("/projects")
        }
        else {
            setError({
                title: "To save your project, you need to create an account.",
                message: "Don’t worry, it’s free!",
            });
        }
    }

    const errorHandler = () => {
        setError(null);
    } 

    return (
        <div className="save_div">
            {error && (
                <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} save="true" body={props.body} />
            )}
            <button className="save_btn" onClick={handleClick}>Save Changes</button>
        </div>
    )
}

export default EditModal