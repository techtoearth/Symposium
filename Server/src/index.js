
//import required modules
const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session')
const cookieParser = require("cookie-parser")
const cors = require("cors");
const User = require('./models/user')
const Ques = require('./models/questions')
const app = express()
const port = process.env.PORT || 9000
//module to view json data
app.use(express.json());
//module to parse cookie
app.use(cookieParser())
//use connect with frontend
app.use(
    cors({
      origin: [
        "http://localhost:3000"
      ],
      credentials: true,
    })
  );
app.use(express.urlencoded({extended:true}))
//router for user authentication
app.use("/auth", require("./router/user_router"));
//router for ques
app.use("/ques", require("./router/ques_router"));
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})