import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "../UI/ErrorModal.module.css";

const NameModal = (props) => {
  const [name, setName] = useState("");
 

  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
          <input
            type="text"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            type="submit"
            disabled={!name}
            className={classes.modalBtn}
            onClick={ () => props.changeName(name) }
          >
            Okay
          </button>
        </div>
      </Card>
    </div>
  );
};

export default NameModal;
