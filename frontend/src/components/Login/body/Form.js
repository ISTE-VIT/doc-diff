import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import cookie from "react-cookies";
import "./Form.css";


const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    async function handleSubmit(event) {
        event.preventDefault();
    
        const body = JSON.stringify({
          email,
          password, 
        })
    
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body
        }
    
        await fetch("http://localhost:5000/users/signin", requestOptions).then((response) => {
          const data = response.json();
          if(response.status===200)
          {
            cookie.save("key", email, { path: "/" });
            window.location.href = "http://localhost:3000/projects"
          }
          return data;
        })
          .then((data) => { console.log(data) })
          .catch((error) => {
            console.log(error.message);
          });
      }
    return (
        <div className="signup">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email"> 
              <Form.Control style={{ border:"0px 5px" }} className ="input" 
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password"> 
              <Form.Control className="input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            
            <Button className= "signupBtn" block size="lg" type="submit" >
              Login
            </Button>
          </Form>
        </div>
  
      );
};

export default LoginForm ;