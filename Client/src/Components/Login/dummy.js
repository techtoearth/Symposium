import axios from "axios";
import './styles.css';
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/errormess"
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };
      console.log("hello")

      await axios.post("http://localhost:9000/auth/login", loginData);

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

  return (
    <div>
      <h1>Log in to your account</h1>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}

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
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block" >Log In</button>
              <p className="forgot-password text-right">
                Forgot <Link className="link" to="#">password?</Link>
              </p>
              <p className="lr text-right">
                <Link className="link" to="/signup">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;