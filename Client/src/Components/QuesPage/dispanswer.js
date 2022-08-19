import axios from "axios";
import React, { useContext,useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "../Homepage/homepage.css"


/**
 * Displaying answers for a Question
 * @name Display Answer
 * @function DispAnswer
 * @param {ObjectSchema} question - Question for which to display Answer 
 * @returns {html} - Html component with displaying answers with like feature in a sorted order of likes
 */

function DispAnswer({ question }) {
  // aId: String. stores answer ID. By default is empty string
  const [aId , setaId] = useState("");
  // qId: String. stores ID. By default is empty string
  const [qId , setQId] = useState("");

  /***
    * Renders answers in sorted order of likes
  */

  /**
 * Renders answers in sorted order of likes
 * @name render Answer
 * @function renderAns
 */

  function renderAns() {
    if (question.count_answers === 0 || question === false) {
      return(<p>Error</p>)
    }
    
    else {
      // answer stores the array of answers(ObjectSchema) of that question
      const answer=question.answers
      // sort the answers in descending order of likes
      const answers = answer.sort((a, b) => a.upVoteCount<b.upVoteCount ? 1 : -1);
      // for each answer returns separate html component
      return question.answers.map((answer, j) => {
      
        return (
          <div className="container answer-box mt-5">
            <div className="row">
              <div className="col-1 mt-3">
                <button onClick={async()=>OnVote(answer._id)}><i class="fa fa-thumbs-up"></i></button><br />
              <span className="text-color view">Votes :{answer.upVoteCount}</span>
              </div>
              <div className="col">
                <div className="row ml-5 mt-1">
                  <p key={j} className="text-color answer_body"> {answer.body}</p>
                </div>
                <div className="row ml-5 answered_by">
                    <p key={j + 1} className="text-color answer-author1">answered by <span className="answer-author">{answer.author}</span> posted at <span>{answer.created_at}</span>  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
   

    /**
 * likes feature added. One user can like only once
 * @name Voting method
 * @function OnVote
 */
    async function OnVote(answerId){
      // Setting useState values
      setQId(question._id)
      setaId(answerId)
      // data is a dictionary to be sent in backend

      const data={qId:question._id,aId:answerId}
      // Invoking routing function from backend
      await axios.post("http://localhost:9000/ques/ans/upVote",data ).then((response)=>{
      window.location.reload();
  })
 
    }
  }

  return (
    <div>
      {renderAns()}
    </div>
  );

}

// Exporting module
export default DispAnswer;