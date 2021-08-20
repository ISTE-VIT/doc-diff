import './loginBody.css'
import img4 from "../../../images/loginimg.svg";
import Form from "./LoginFb"; 
import GButton from '../../Signup/body/GButton';


const loginBody = () => {
    return(
        <div className="row loginBody">
            <div className="col-lg-5">
            <h2 className="blue extra-bold">Login</h2>
                 <Form />  
                 <GButton text="Login with Google"/>
            </div>
            <div className="col-lg-7">
            <img src={img4} className="loginImage" alt="timemator"/>
            </div>
        </div>
    )
}

export default loginBody;