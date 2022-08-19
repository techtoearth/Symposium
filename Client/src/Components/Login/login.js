import axios from "axios";
import './styles.css';
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/errormess"
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

/**
 * Login
function Login() {
 * @function 
 * @name Login
 * @returns {html} html div component containing login form
 */
function Login() {

  //email variable used to store email given by user
  const [email, setEmail] = useState("");

  //password variable used to store password given by user
  const [password, setPassword] = useState("");

  //errorMessage variable used to store the error Message which we get from the server side if the email or password 
  //is not there already in database
  const [errorMessage, setErrorMessage] = useState("")

  //err variable used to store all the errors which we get when user types something wrong 
  const [err,seterr]=useState({})

  const data = useContext(AuthContext);

  //getLoggedIn boolean variable used to store true or false based on whether user is logged in or not
  const getLoggedIn=data.getLoggedIn

  //history variable used to store the history given by the React Hook
  const history = useHistory();

  /**
   * 
   * @param {*} e e is the event variable
   */
  async function login(e) {
    e.preventDefault();
    
    // isValidated boolean variable which is true if there are no errors 
    var isValidated=true

    //err an object which stores the error field name (key) and error message (value) 
    let error={};

    //here we check whether entered email is valid or not using regex
    if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
      isValidated=false;

      //if it is not valid then we set the error with key = " email" and value = error message
      error["email"]="Email is invalid";
    }

    //here we check whether the entered password length  is greated than 5 or not
    if(password.length <6){
      isValidated=false;
      error["password"]="Password length is too short";
    }

    if(isValidated){
      //if there are no errors then we are here
    try {
      const loginData = {
        email,
        password,
      };
      console.log("hello")

      //an http post request has been made using axios
      await axios.post("http://localhost:9000/auth/login", loginData);

      await getLoggedIn();
      console.log("login:",data.loggedIn)

      //here we push the address where we want to be redirected after login
     history.push("/home");
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          // setErrorMessage sets the error message we get from the server side;
          setErrorMessage(err.response.data.errorMessage)
        }
      }
    }
  }
  
  else{
    //if there are any errors then we set them here to display it in user interface
    seterr(error)
  }
  }

  return (
    <div>
   <div className="errorMessage">   {/* Here we display all the error messages we get due to incorrect typings */}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      </div>

      <div className="container">
        <div className="row row-container">
          <div className="col-3"></div>
          <div className="col-5 section">
            <form className="demoForm" onSubmit={login}>
              <h2>Log In</h2>
              
              <div >
                <label htmlFor="email">Email address</label>
                <input type="email" required className="form-control" name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                  <p className="errors">{err["email"]}</p>
              </div>
              <div className="form-group" >
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
                  <p className="errors">{err["password"]}</p>
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block" >Log In</button>
              
              <p className="lr text-right">
                <Link className="link" to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;