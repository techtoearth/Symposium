const User = require('../models/user')
const express = require('express')
const jwt=require("jsonwebtoken")
const router = new express.Router()




router.get('/',async(req,res)=>{
    try{
        const user=await User.find()
        res.json(user)
    }
    catch(e){
        res.send(e)
    }
})
/**
 * Route serving registration of user.
 * @name register user
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware function to save the user details in User Schema.
 */

router.post("/",async (req,res)=>{
   //get the details typed by the user
    const {name,email,password}=req.body
    try{
      //find the emails typed by the user already exist
        const existing_user= await User.findOne({email})
        if(existing_user){
            res.status(400).json({
                errorMessage: "An account with this email already exists.",
              });
            }
        //create a new user Object
        const new_user= new User({name,email,password})
        //save the user object
        const saved_user=new_user.save()
        res.status(201).send();


}
catch(e){
    res.send(e)
}
})
/**
 * Route serving user login.
 * @name login user
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express function to match details of user with the details present in the database.
 */
router.post("/login", async (req, res) => {
    try {
      //get the details typed by user
      const { email, password } = req.body;
  

      //find if such user exist
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        
        return res.status(401).json({ errorMessage: "EMAIL NOT FOUND" });
      //match the password
      if(password!=existingUser.password){
        return res.status(401).json({ errorMessage: "Wrong email or password." });
      }
  
     //create a jwt token having user details
  
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        "secret_key"
      );
  
      // send the token in a HTTP-only cookie
      //store the token as cookie 
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });


/**
 * Route serving userLogout.
 * @name logout user
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express function remove the cookie which contain the jwt token of the user.
 */
router.get("/logout", (req, res) => {
  //expire the cookie  
  res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      }).send()
    })
/**
 * Route serving to see if a user is logged in.
 * @name get name of the user 
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express function verify the jwt token present
 */
router.get('/author',async (req,res)=>{
        const token =req.cookies.token
        //get the token from http cookie
        const verified = await jwt.verify(token, "secret_key");
        //verify the token
        const user= await User.findById(verified.user)
        //find the user from the token
        res.send(user.name)
      })
/**
 * Route serving to see if a user is logged in.
 * @name Check loggedin
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express function verify the jwt token present
 */
router.get("/loggedIn", async(req, res) => {
        try {
          const token = req.cookies.token;
    
           //get the token from http cookie
          if (!token) return res.json(false);
        //return if no token is present
          await jwt.verify(token, "secret_key");
          //verify the token
          const user=await User.findByToken(token)
    
          //find the user from the token
          const id=user._id
          res.json({loggedIn:true,id:id});
          //send true if token is matched
        } catch (err) {
          res.json(false);
        } 
      });
module.exports=router