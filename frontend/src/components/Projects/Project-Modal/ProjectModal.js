import cookie from "react-cookies";
import { useState } from "react";
import ErrorModal from "../../UI/ErrorModal";
import { useHistory } from "react-router";

const ProjectModal = () => {

    const [error, setError] = useState(null);
    const history = useHistory()

    const handleClick = () => {
        const key = cookie.load("key");
        if (key) {
            history.push("/projects")
        }
        else {
            setError({
                title: "To view your projects, you need to create an account.",
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
            <button className="nav-item nav-link noBorder" href="/projects" onClick={handleClick}>Projects</button>
        </div>
    )
}

export default ProjectModal