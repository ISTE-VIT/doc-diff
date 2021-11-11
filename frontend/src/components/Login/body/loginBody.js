import "./loginBody.css";
import img4 from "../../../images/loginimg.svg";
import Form from "./LoginFb";
import { useHistory } from "react-router-dom";
import GButton from "../../Signup/body/GButton";

const LoginBody = () => {
  const history = useHistory();
  return (
    <div className="row loginBody">
      <div className="col-lg-5">
        <h2 className="blue extra-bold">Login</h2>
        <Form />
        <GButton text="Login with Google" />
        <div className="foot">
        <h6>
          Don't have an account ?
          <button
            className="noBorder blue nobg"
            onClick={() => history.push("/signup")}
          >
            Sign Up
          </button>
        </h6>
        </div>
      </div>
      <div className="col-lg-7">
        <img src={img4} className="loginImage" alt="doc-diff" />
      </div>
    </div>
  );
};

export default LoginBody;
