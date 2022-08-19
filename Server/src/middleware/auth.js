const jwt = require("jsonwebtoken");

const User = require('../models/user')
/**
 * Middleware function to verify thee user token.
 * @name Check authentication
 * @function Middleware 
 * @param {Callback}  -  Callback argument to the middleware function, called "next" by convention.
 * @param {Object} - HTTP response argument to the middleware function, called "res" by convention.
  * @param {Object} -   HTTP request argument to the middleware function, called "req" by convention.
 */
async function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    //get the token present in user side
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized user" });

    const verified = await jwt.verify(token, "secret_key");
    // verify the token
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;