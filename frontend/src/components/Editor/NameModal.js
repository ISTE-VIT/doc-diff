import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "../UI/ErrorModal.module.css";
import "./NameModal.css";

const NameModal = (props) => {
  const [name, setName] = useState("");
  const [share, setShare] = useState(false);

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
          <div className="shareable">
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setShare(!share);
              }}
              />
            <span className="slider round"></span>
          </label>
              <div className="text">Shareable</div>
          </div>


          <button
            type="submit"
            disabled={!name}
            className="modal-Btn"
            onClick={() => {
              props.changeName(name);
              props.changeShare(share);
            }}
          >
            Okay
          </button>
          <h5 className="note"><b>Note:</b> To save a Project you must be signed in</h5>

        </div>
      </Card>
    </div>
  );
};

export default NameModal;
