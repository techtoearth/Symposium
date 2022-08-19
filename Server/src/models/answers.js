const mongoose = require('mongoose')

const User = require('./user')

const uri = "mongodb+srv://Hrishi:qwerty1234@symposium.caypb.mongodb.net/symposium?retryWrites=true&w=majority";

const moment=require('moment')


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
 * Answer schema, contains replies too
 * @constructor Answer Schema
 * 
 */

const answerSchema = new mongoose.Schema({
  //author of the answer

    author: {

      type: String,

    },

//email of the author

    email: {

      type: String,

      trim: true,

      lowercase: true,

    },

//body of the answer

    body: {

      type: String,

      required: true,

      trim: true,

    },

   
//array containing user who upvoted
    upVoteCount : {type:Number,

      default:0

      },

//count of upvotes

      upVotes: [{

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User"

        }}],

//timestamp

    created_at:{

      type:String,

      required: true,

    }

  });

const Answers = mongoose.model('Answers', answerSchema)

module.exports = Answers