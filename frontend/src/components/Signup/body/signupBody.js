import "./signupBody.css";
import img5 from "../../../images/signupimg.svg";
import Form from "./FormFb";
import GButton from "./GButton";
import { useHistory } from "react-router-dom";

const Signupbody = () => {
  const history = useHistory();
  return (
    <div className="row signupbody ">
      <div className="col-lg-5">
        <h2 className="blue extra-bold">Register Here</h2>
        <Form />
        <GButton text="Signup with Google" />
        <div className="foot">
          <h6>
            Already have an account ?
            <button
              className="noBorder blue nobg"
              onClick={() => history.push("/login")}
            >
              Login
            </button>
          </h6>
        </div>
      </div>
      <div className="col-lg-7">
        <img src={img5} className="loginImage" alt="doc-diff" />
      </div>
    </div>
  );
};

export default Signupbody;
