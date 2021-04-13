import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import firebaseApp from "./../firebase/firebaseConfig";
import AuthContext from "./../auth/AuthContext";

import FormInput from "./../components/forms/FormInput";
import Button from "./../components/buttons/Button";
 
const RegisterPageStyles = styled.div`
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

const RegisterPage = (props) => {
    // useState ---hook----functional approach to building components
    const auth = useContext(AuthContext)
    const [username, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [isValid, setIsValid]=useState(false)

    const handleClick = (e) => {
        firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirect to login route
            auth.isUser = true
            setIsValid(true)
        })
          .catch((error) => {
            console.log(error.code, error.message);
            setIsValid(false);
          });
      };

    if (isValid){
        return <Redirect to="/login"/>
    } else{
        return (
         <RegisterPageStyles>
             
             <header>
                 <h1>Unlimited Trial Account</h1>
                  <p>no credit card required</p>
             </header>


          <FormInput   
            inputType="text" 
            label="name on the account" 
            onChange={(e)=> setName(e.target.value.trim())}/>
          <FormInput
            inputType="email" 
            label="valid email address"
            onChange={(e)=> setEmail(e.target.value.trim())}/>
          <FormInput
            inputType="password"
            label="password"
            onChange={(e)=> setPassword(e.target.value.trim())}/>
          <Button
            label="create a new account"
            uiStyle="login"
            onClick={handleClick}/>

         </RegisterPageStyles>
        );
    }

    
}
 
export default RegisterPage;