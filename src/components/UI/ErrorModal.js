import React from "react";
import classes from "./ErrorModal.module.css";
const ErrorModal = React.memo((props) => {
  return (
    <>
      <div className={classes.backdrop} onCLick={props.onClose}>
        <div className={classes.error_modal}>
          <h2>An Error Occured!</h2>
          <p>{props.children}</p>
          <div className={classes.error_modal_actions}>
            <button type='submit' onClick={props.onClose}>
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default ErrorModal;
