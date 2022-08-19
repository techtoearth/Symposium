import axios from "axios";
import React, { useContext, useState } from "react";
import ErrorMessage from "../ErrorMessage/errormess"
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import './styles.css';
import { Link } from 'react-router-dom';

var isValidated=true
function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const [emailValid, setEmailValid] = useState("");
  const [nameValid, setNameValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [passwordVerifyValid, setPasswordVerifyValid] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  console.log("register")

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  
  async function register(e) {
    e.preventDefault();
    if(name.length <1){
      isValidated=false;
      setNameValid("Field user name cannot be empty")
    }
    if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
      isValidated=false;
      setEmailValid("Email is invalid")
    }
    if(password.length <6){
      isValidated=false;
      setPasswordValid("Password length is too short")
    }
    if(password  !== passwordVerify){
      isValidated=false;
      setPasswordVerifyValid("Password and confirm password do not match")
    }
    if(isValidated){
      try {
        const registerData = {
          email,
          password,
          name,
        };
  
        await axios.post("http://localhost:9000/auth/", registerData);
  
        await getLoggedIn();
        history.push("/home");
      } catch (err) {
        if (err.response) {
          if (err.response.data.errorMessage) {
            setErrorMessage(err.response.data.errorMessage);
          }
        }
      }
    }
    else{
      console.log(nameValid);
      console.log(emailValid);
      console.log(passwordValid);
      console.log(passwordVerifyValid);
      
      isValidated=true;
      
    }
  }

  return (
    
    <div className="container">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
        <div className="row row-container">
          <div className="col-3"></div>
          <div className="col-5 section">
            <form className="demoForm" onSubmit={register}>
              <h2>Sign up</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control"
                  placeholder="Enter your user name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name} />
                  {isValidated && <p className="errors">{nameValid}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" required className="form-control" name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email} />
                  {isValidated && <p className="errors">{emailValid}</p>}
              </div>
              <div className="form-group" >
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
                  {isValidated && <p className="errors">{passwordValid}</p>}
              </div>
              <div className="form-group" >
                <label htmlFor="repassword">Confirm Password</label>
                <input type="password" className="form-control" name="repassword"
                  placeholder="Confirm Password"
                  onChange={(e) => setPasswordVerify(e.target.value)}
                  value={passwordVerify} />
                  {isValidated && <p className="errors">{passwordVerifyValid}</p>}
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block">Sign up</button>
            </form>
            <p className="text-right">
              <Link className="link" to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
  );
}

export default Register;