const mongoose = require('mongoose')
const User = require('./user')
const answerSchema = require('./answers').schema;
const moment=require('moment')
//connect to cloud mongodb url
const uri = "mongodb+srv://Hrishi:qwerty1234@symposium.caypb.mongodb.net/symposium?retryWrites=true&w=majority";


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
 * @constructor Question Schema
 */
const questionSchema = new mongoose.Schema({
  //author of the    question
    author: {
      type: String,
    },
    //unique id of author
    author_id:{
      type:String,

    },
    //array storing the vie details
    views:[{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    }],
    //count of views
    viewsCount:{
      type:Number,
      default:0
    },
    //body of the  question
    body: {
      type: String,
      required: true,
      trim: true,
    },
    //array storing the upvote details
    upVotes: [{
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }}

  ],
  //count of upvote
  upVoteCount : {type:Number,
  default:0
  },
  tags:[{
    type:String
  }],
  //array containing answers
  answers: [answerSchema],
  count_answers:{
    type: Number,
    default:0
  },
  //timstamp
  created_at:{
    type:String,
    required: true,
    // default:moment().format('D MMM, YYYY h:mm:ss a')
  }
  });


  /**
 * Count the number of views,votes ,answers of a question before saving
 *
 * @function pre

 * @param {Callback} - Callback argument to the middleware function, called "next" by convention.
 */
  questionSchema.pre('save', function (next) {
    //count the upvote before saving it

    this.upVoteCount = this.upVotes.length
    //count views before saving the ques

    this.viewsCount=this.views.length
//count the answer
    this.count_answers=this.answers.length

    this.answers.forEach(function (ans) {

      ans["upVoteCount"] = ans.upVotes.length;

  });

    next();

  });
const Questions = mongoose.model('Questions', questionSchema)
module.exports = Questions