const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Hrishi:qwerty1234@symposium.caypb.mongodb.net/symposium?retryWrites=true&w=majority";

const jwt=require("jsonwebtoken")


try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
  /**
 * Question schema, contains replies too
 * @constructor User Schema
 */
const userSchema = new mongoose.Schema({
    //name of the user
    name: {
        type: String,
        required: true
    },
    //email of the user
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
         
    },
    //password of the user

    password: {

        type: String,
        trim: true,
        minlength: 5,
        lowercase: true,



    },
})

 /**
 * Verify the jwt token 
 *
 * @function findByToken

 * @param {Object} -  a token object
 */
userSchema.statics.findByToken = async(token) => {
    const verified = await jwt.verify(token, "secret_key");
    const user= await User.findById(verified.user)
    return user
}
const User = mongoose.model('User', userSchema)

module.exports = User