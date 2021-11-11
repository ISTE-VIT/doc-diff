import React from "react";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

const ConfirmationModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div> 
        <span className={classes.yesNoBtn}><button onClick={props.onDelete} className="btn3" >Yes</button><button onClick={props.onConfirm} className="btn3 ml" >No</button></span> 
      </Card>
    </div>
  );
};

export default ConfirmationModal;
