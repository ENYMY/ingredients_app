import React, { useCallback, useContext } from "react";
import classes from "./Auth.module.css";
import { AuthContext } from "../Auth/auth-context";
import Card from "./UI/Card";
const Auth = () => {
  const { login } = useContext(AuthContext);

  const loginHandler = () => {
    login();
  };
  return (
    <div className={classes.auth}>
      <Card>
        <h2>You are not Authenticated</h2>
        <p>Please Login to Continue</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
