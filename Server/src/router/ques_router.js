

//import requires modules
const moment=require('moment')
const Ques = require('../models/questions')
const User = require('../models/user')
const Ans = require('../models/answers')
const express = require('express')
const router = new express.Router()
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")


/**
 * Route serving post Question by user.
 * @name Post Question
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express function to post question by user.
 */
router.post("/postQues", async (req, res) => {
    const body = req.body.body
    //contains body of the question
    const tags = req.body.tags
    //contains the tag of the question
    try {
        const user = await User.findByToken(req.cookies.token)
        //find the user that is logged in
        const author = user.name
        //get the name of logged in user
        const author_id = user._id
        //get the id of the logged in user
        const created_at=moment().format('D MMM, YYYY h:mm:ss a')
        //get the time of posting of question
        const ques = new Ques({ author, author_id, body, tags , created_at})
        //create a new object for question schema
        const newQues = await ques.save()
        //save the question schema
        res.json(newQues)
        //send the client the saved question

    }
    catch (e) {
        res.status(404).send("Something went wrong")
    }
})

/**
 * Route serving to get all the question.
 * @name render all the question
 * @function
 * @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to return the questions
 */
router.get('/', async (req, res) => {
    try {
        const ques = await Ques.find()
        res.json(ques)
     //find all the questions in question schema and return to client
    }
    catch (e) {
        res.status(404).send(e)
    }
})

//send all the question sorted by count views
/**
 * Route serving to return all question sorted by viewsCount.
 * @name Sort_Question_views
 * @function
 * @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to return the all the question sorted by views
 */
router.get('/view', async (req, res) => {
    try {
        const user = await Ques.find().sort({ viewsCount: -1 })
        
        res.json(user)
        //find all the question,sort in by viewsCount and return to client

    }
    catch (e) {
        res.status(404).send(e)
    }
})

//send all the question sorted by count votes
/**
 * Route serving to return all question sorted by votesCount.
 * @name Sort_Question_votes
 * @function
  * @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to return the all the question sorted by votes
 */
router.get('/vote', async (req, res) => {
    try {
        const user = await Ques.find().sort({ upVoteCount: -1 })
        res.json(user)
     //find all the question ,sort it by votes counts and return to client
    }
    catch (e) {
        res.status(404).send(e)
    }
})

//send all the question sorted by count answer
/**
 * Route serving to return all question sorted by answered Count.
 * @name Sort_Question_answers
 * @function
 * @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to return the all the question sorted by answer
 */
router.get('/answ', async (req, res) => {
    try {
        const user = await Ques.find().sort({ count_answers: -1 })
        res.json(user)

    //find all the question ,sort it by answered counts and return to client   
    }
    catch (e) {
        res.status(404).send(e)
    }
})






//send all the question details clicked by user
/**
 * Route serving get the all the details of a question.
 * @name Get details of question
 * @function
 * @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to return the details of question clicked and increase its view count by one
 */
router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    //get the id of question clicked in front end by user

    try {
        const ques = await Ques.findById(_id)
        //find the question by its id
        const user = await User.findByToken(req.cookies.token)
        //find the user who is logged in
        if (!ques) {
            return res.send("No user found")
            //if there is no such question return 
        }
        //function of increase the viewCount of a question so that only one count is given to one user
        if (ques.views.filter(view => view.user._id.toString() ===
            user._id.toString()).length < 1) {
            ques.views.unshift({ user: user });
            await ques.save()
        }
        res.status(201).send(ques)
        //send the question clicked by user to the front end
    } catch (e) {
        res.send("No user found")
    }
})



//upVote a question
/**
 * Route serving to Vote a question.
 * @name Upvote question
 * @function
 * @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to upVote a Question by loggedIn user
 */
router.get("/upVote/:id", async (req, res) => {
    const _id = req.params.id;
    //find the id of the question asked to vote


    try {

        const ques = await Ques.findById(_id)
        //find the question object by its it
        if (!ques) {
            res.json("Question Not found!")
            //return if no such question found
        }
        const user = await User.findByToken(req.cookies.token)
        //find the details of the user logged in


        //function to down vote the question if he tries to vote twice
        if (ques.upVotes.filter(upVote => upVote.user._id.toString() ===
            user._id.toString()).length > 0) 
            //check if user is already present the question vote Count
            
            {
            const removeThis = ques.upVotes
                .map(item => item.user._id.toString())
                .indexOf(user._id.toString());
            
            //find such user and delete its details from upvote count
            await ques.upVotes.splice(removeThis, 1);
            await ques.save().then((req, res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            //save the object after removing the user from its vote Count list
            console.log(ques)
            return res.json(ques)

        }
        //add user to the list of upVOted user of the question
        ques.upVotes.unshift({ user: user });
        //save the question
        await ques.save()
        //send the question
        res.status(201).send(ques)
    }
    catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
})

//post answer by user
/**
 * Route serving posting of answer.
 * @name postAnswer    
 * @function
 @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to return Answer posted by verified user
 */
router.post('/postAns', async (req, res) => {
    
    try {
        //find the details of the logged in user
        const token = req.cookies.token
        const verified = await jwt.verify(token, "secret_key");
        const user = await User.findById(verified.user)

        //get the time of posting
        const created_at=moment().format('D MMM, YYYY h:mm:ss a')

        //get the name of user
        req.body.author = user.name
        //get the name of user email
        req.body.email = user.email

        //check if user is authorised user
        if (!user.email.match(/^[0-9a-z]+@iitb\.ac\.in$/)) {
            let msg = "You are not authorized to post answer";
           
            res.status(404).json({
                errorMessage: "You are not authorized to post answer",
            });
        }

        else {
            //find the question to be answered
            await Ques.findOne({ _id: req.body.Quesid }, (err, question) => {
               //get the details of the answer posted by user
                author = req.body.author
                email = req.body.email
                body = req.body.body
    
                if (err || !question) res.status(500).json("Something went wrong.")
                else {
                    //create a new Ans Object
                    const ans = new Ans({ author, email, body ,created_at })
                    //save the answer object
                    ans.save()
                    question.answers.push(ans)
                    //push the answer object to the question
                    question.save()
                    //save the question

                    return
                }
            })
        }
    } catch (e) {
        console.log('404 error occuring')
         res.send(e)

    }
})

//searching of question
/**
 * Route serving searched question by user.
 * @name Search answer
 * @function
* @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to return the searched question
 */
router.post("/search",async (req,res) =>{
    //get the searched text
    const body=req.body.search
    //split the sentence into strings of words
    const substrings = body.split(" ")
    const ques=await Ques.find()
    //put the ques object in ques variable
    var count
    //count the number of matched items
    var result=[]
    //get the searched result in result array
    var flag=0
    //flag variable to check if there is a match
    //search each question and match and the user strings
    ques.forEach(async (title) => {
        questitle=title.body
        len=substrings.length
        
        count=0
        while(len--) {
            if (questitle.indexOf(substrings[len])!=-1) {
                count=count+1
                flag=1
            }
         }
        if(count!=0){
            result.push({ques:title,match:count})
        }
    })

    //sort the result by most matched strings
    result=result.sort((a, b) => parseFloat(b.match) - parseFloat(a.match));
    //remove the match count variable and return only the questions
    result = result.map(({ match, ...r }) => r);
    
    if(flag){
        res.send(result)
    }
    else{res.send(false)}
})
/**
 * Route serving to return all the tags.
 * @name get tags
 * @function
* @inner
 * @param {string} path -  route path
 * @param {callback} middleware - middleware function to return the all the tags that has been used in all the question
 */
router.post('/tagsSection', async (req, res) => {
    try {
        const all_questions = await Ques.find()
        //get all the question 
       
        const all_tags={}
        //variable to store all the tags

        //function to find all the tags of all the question
        for(let i=0;i<all_questions.length;i++){
            let tags=all_questions[i].tags
            for(let j=0;j<tags.length;j++){
                let tag=tags[j]
                if(!(tag in all_tags)){
                    all_tags[tag]=1
                }
                else{
                    all_tags[tag]=all_tags[tag]+1;
                }
            }
        }
        res.json(all_tags)
        //return all the tags used
    }
    catch (e) { 
        res.status(404).send(e)
    }
})




//upVote an answer
/**
 * Route serving upVote an answer.
 * @name UpVote an answer
 * @function
 * @inner
 * @param {string} path -  path
 * @param {callback} middleware - middleware function to upVote a answer
 */
router.post("/ans/upVote",async(req,res)=>{

        const qId = req.body.qId
    
        const aId = req.body.aId
        //get the details the question and the answer which needs to be upvoted by user

        
    
        try {
    
    
    
            const ques = await Ques.findById(qId)
            //find the question 
    
    
    
            if (!ques) {
    
                console.log("No Answer found!")
    
            }
            //find the answer to be upvoted and store it in varibale ans2
    
            let ans2=(ques.answers.filter(ans=>{
    
             
    
                return ans._id.toString() === aId
    
              }))
    
            ans=ans2[0]
            //dereference the array
    
    
    
            const user = await User.findByToken(req.cookies.token)
            //find the logged in user

    
            if (ans.upVotes.filter(upVote => upVote.user._id.toString() ===  
    
                user._id.toString()).length > 0)
            //find if user already presend in upVote list of the user
    {
    
                const removeThis = ans.upVotes
    
                    .map(item => item.user._id.toString())
    
                    .indexOf(user._id.toString());
        //find the user in its list of upVotes
    
               
    
                await ans.upVotes.splice(removeThis, 1);
    //remove the user from its list
    
               
    
                await ques.save().then((req, res) => {
    
                    console.log("deleted user")
    //save the ques object after removing
                }).catch((err) => {
    
                    console.log("Cannot delete")
    
                })
    
          
    
                return res.json(ans)
    
    
    
            }
    
    
        //add the user to its list of upVote 
            ans.upVotes.unshift({ user: user })
    
            await ques.save()
    //save the question
    
            res.send(ans)
    //return the question
    
        }
    
        catch (e) {
    
            console.log(e)
    
            res.status(404).send(e)
    
        }
    
    
    
    })


module.exports = router
