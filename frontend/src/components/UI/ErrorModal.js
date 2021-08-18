import React from 'react';
import { useHistory } from "react-router-dom";
import Google from "../Signup/body/Google";

import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
  const history = useHistory();

  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        <button className= {classes.modalBtn} block size="lg" type="submit" onClick={() => history.push('/signup')}>
              Register
        </button>
        <Google text="Signup with Google"/> 
        </div> 
      </Card>
    </div>
  );
};

export default ErrorModal;
