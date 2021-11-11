import React, { useState,useRef } from "react";
import Card from "../../UI/Card";
import classes from "../../UI/ErrorModal.module.css";
import clipboardicon from "../../../images/clipboard.svg";
import "../../Editor/NameModal.css";


const ShareModal = (props) => {
  const [share, setShare] = useState(props.shareable);
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy'); 
    e.target.focus();
    setCopySuccess('Copied!');
  };


  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
          <input value={`/projects/${props.id}`} ref={textAreaRef} readOnly></input> 
          <button className="editing" onClick={copyToClipboard}><img className="editing" alt="doc-diff" src={clipboardicon} className="round" /></button> 
          <div className="copied">{copySuccess}</div> 
          <div className="shareable row">
            <div className="col-lg-6 slider-fix">
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
            </div>
            <div className="text col-lg-6 shareable-fix">Shareable</div>
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
