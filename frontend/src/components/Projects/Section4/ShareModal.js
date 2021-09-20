import React, { useState } from "react";
import Card from "../../UI/Card";
import classes from "../../UI/ErrorModal.module.css";
import "../../Editor/NameModal.css";

const ShareModal = (props) => {
  const [share, setShare] = useState(props.shareable);

  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
          <input value={`/projects/${props.id}`} readOnly></input>
          <div className="shareable">
            <label className="switch">
              <input
                type="checkbox"
                checked={share}
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
            className={classes.modalBtn}
            onClick={() => {
              props.onShare(share);
            }}
          >
            Okay
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ShareModal;
