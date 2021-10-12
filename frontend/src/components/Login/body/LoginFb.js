import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useState, useRef } from 'react'
import cookie from "react-cookies";
import { Form, Button, Alert } from 'react-bootstrap'
import "../../Signup/body/Form.css"
import { useHistory } from 'react-router';


var FormFb = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  let handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
        .then((res) => {
          cookie.save("key", res.user.uid, { path: "/" }); 
          history.push("/projects")
        })
    } catch (error) {
      setError("Failed to create an account")
      console.log(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="signup">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group size="lg" controlId="email">
          <Form.Control style={{ border: "0px 5px" }} className="input"
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
        <Button className="signupBtn" disabled={loading} block size="lg" type="submit" >
          Register
        </Button>
      </Form>
    </div>
  )
}

export default FormFb


