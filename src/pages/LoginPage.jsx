import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import firebaseApp from "./../firebase/firebaseConfig";
import AuthContext from "./../auth/AuthContext";

import FormInput from "./../components/forms/FormInput";
import Button from "./../components/buttons/Button";

const LoginPageStyles = styled.div`
  max-width: 480px;
  margin: 6rem auto 0;
  header {
    text-align: center;
    margin-bottom: 2rem;
  }
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
  .jimo {
    background: grey;
  }
  button {
    margin-top: 2rem;
  }
`;

const LoginPage = (props) => {
  // useState ---hook----functional approach to building components
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("james@home.com");
  const [password, setPassword] = useState("123456");
  const [isValid, setIsValid] = useState(false);

  const handleClick = (e) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // auth
        // redirect have react router dom
        auth.isUser = true
        setIsValid(true);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setIsValid(false);
      });
  };

  if (isValid) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <LoginPageStyles>
        <header>
          <h1>Account Login</h1>
        </header>
        <FormInput
          inputType="email"
          label="valid email address"
          onChange={(e) => setEmail(e.target.value.trim())} />
        <FormInput
          inputType="text"
          label="password (8 characters)"
          onChange={(e) => setPassword(e.target.value.trim())} />
        <Button
          onClick={handleClick}
          label="login"
          uiStyle="signup" />
      </LoginPageStyles>
    );
  }
};

export default LoginPage;