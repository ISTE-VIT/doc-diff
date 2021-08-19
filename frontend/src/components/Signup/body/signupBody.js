import './signupBody.css'
import img5 from "../../../images/signupimg.svg";
import Form from "./Form";
import Google from "./Google";
import GButton from './GButton';


const signupbody = () => {
    return(
        <div className="row signupbody">
            <div className="col-lg-5">
            <h2 className="blue extra-bold">Register Here</h2>
                 <Form />  
                 {/* <Google text="Signup with Google"/> */}
                 <GButton text="Signup with Google"/>
            </div>
            <div className="col-lg-7">
            <img src={img5} className=" " alt="timemator"/>
            </div>
        </div>
    )
}

export default signupbody;