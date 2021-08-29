import React from 'react'   
import { useAuth } from '../../context/AuthContext'
import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import cookie from "react-cookies"; 
import { Form, Button, Alert } from 'react-bootstrap'


var FormFb=()=> {
    const emailRef=useRef(); 
    const passwordRef=useRef();
    const confirmRef=useRef();
    const {SignUp} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let history = useHistory()


    async function handlePost() { 
      let email = emailRef.current.value;
      let password = passwordRef.current.value; 
    
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
    
        await fetch("http://localhost:5000/users/signup", requestOptions).then((response) => {
          const data = response.json(); 
          if(response.status===200)
          {
            cookie.save("key", emailRef, { path: "/" });
            window.location.href = "http://localhost:3000/projects"
          }
          return data;
        })
          .then((data) => { console.log(data) })
          .catch((error) => {
            console.log(error);
          });
      }

     let handleSubmit= async(e)=> {
        e.preventDefault()
    
        if (passwordRef.current.value !== confirmRef.current.value) {
          return setError("Passwords do not match")
        } 
        try {
          setError("")
          setLoading(true)
          await SignUp(emailRef.current.value, passwordRef.current.value) 
          handlePost();
        } catch(error) {
          setError(error.message) 
        }
        setLoading(false)
      }

    return (
        <div className="signup">
          <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group size="lg" controlId="email"> 
              <Form.Control style={{ border:"0px 5px" }} className ="input" 
                placeholder="Email Address"
                type="email" 
                ref={emailRef} 
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password"> 
              <Form.Control className="input"
                placeholder="Password"
                type="password" 
                ref={passwordRef} 
              />
            </Form.Group>
            <Form.Group size="lg" controlId="confirmPassword">
              <Form.Control className="input"
                placeholder="Confirm Password"
                type="password" 
                ref={confirmRef} 
              />
            </Form.Group>
            <Button className= "signupBtn margintop" disabled={loading} block size="lg" type="submit" >
              Register
            </Button>
          </Form>
        </div>
    )
}

export default FormFb


