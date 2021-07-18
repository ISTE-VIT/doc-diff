import './loginBody.css'
import img4 from "../../../images/loginimg.svg";
import Form from "./Form";
import Google from "../../Signup/body/Google";


const loginBody = () => {
    return(
        <div className="row loginBody">
            <div className="col-lg-5">
            <h2 className="blue extra-bold">Login</h2>
                 <Form /> 
                 <Google text="Login with Google"/>
            </div>
            <div className="col-lg-7">
            <img src={img4} className=" " alt="timemator"/>
            </div>
        </div>
    )
}

export default loginBody;