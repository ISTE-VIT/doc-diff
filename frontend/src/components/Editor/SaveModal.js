import cookie from "react-cookies";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import axios from "axios";


const SaveModal = (props = { body: {} }) => {
    const [error, setError] = useState(null);

    const handleClick = () => {
        const key = cookie.load("key");
        if (key) {
            axios.post("http://localhost:5000/projects/create", props.body).then((res) => {
                console.log(res);
            });
            window.location.href = "http://localhost:3000/projects"
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
        <div>
            {error && (
                <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />
            )}
            <button className="save_btn" onClick={handleClick}>Save to Projects</button>
        </div>
    )
}

export default SaveModal