import cookie from "react-cookies";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import axios from "../../utils/axiosForBackend";
import { useHistory } from "react-router";


const SaveModal = (props = { body: {} }) => {
    const [error, setError] = useState(null);
    const history = useHistory()
    const key = cookie.load("key");
    const handleClick = async () => {
        if (key) {
            console.log("request body:", props.body)
            await axios.post("/projects/create", props.body).then((res) => {
                console.log(res);
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
        <div className="save_div" >
            {error && (
                <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} save="true" body={props.body} />
            )}
            {key && (<button className="save_btn" onClick={handleClick}>Save to Projects</button>)}
        </div>
    )
}

export default SaveModal