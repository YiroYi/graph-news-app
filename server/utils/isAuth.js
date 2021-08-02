const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");

const thowAuthError = () => {
  throw new AuthenticationError("You are not auth");
};

const authorize = (req, verify = false) => {
  const authorizationHeader = req.headers.authorization || "";

  if (!authorizationHeader) {
    req.isAuth = false;
    return !verify ? thowAuthError() : req;
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token || token === "") {
    req.isAuth = false;
    return !verify ? thowAuthError() : req;
  }

  let decodedJWT;

  try {
    decodedJWT = jwt.verify(token, process.env.SECRET);
    if (!decodedJWT) {
      req.isAuth = false;
      return !verify ? thowAuthError() : req;
    }

    req.isAuth = true;
    req._id = decodedJWT._id;
    req.email = decodedJWT.email;
    req.token = token;
    return req;
  } catch (err) {
    req.isAuth = false;
    return !verify ? thowAuthError() : req;
  }
};

module.exports = authorize;
