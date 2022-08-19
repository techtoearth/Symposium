import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

/**
 * Authenticator for front end to retrieve loggedin user info
 * @function AuthContextProvider
 * @name Authenticator for front end
 * @returns {Object} returns user info
 */

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userId, setUserId] = useState("")

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:9000/auth/loggedIn");
    await setUserId(loggedInRes.data.id)
    await setLoggedIn(loggedInRes.data.loggedIn);

  }

  useEffect(() => {
    getLoggedIn();
  }, [loggedIn]);

  return (

    <AuthContext.Provider value={{ userId, loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext
export { AuthContextProvider };