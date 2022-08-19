import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import DispAnswer from './dispanswer';
import Homepagelist from '../Homepage/homepagelist'
import "../PostQuestion/tagsInput.css"


/**
 * Posting answer for a Question
 * @name Post Answer
 * @function Answer
 * @param {ObjectSchema} question - Question for which to Post Answer 
 * @returns {html} - Html component with post answer text area and on click updates database and rendered fresh data
 */

function Answer({ question }) {
  // body: String. stores answer body from text area. Default value empty string
  const [body, setBody] = useState("");
  // err: String. stores error message. When non IITB student tries to post answer, It displays non authorised message.
  const [err, seterr] = useState("")
  const { getLoggedIn } = useContext(AuthContext);
  // create useHistory for keeping track of history of webpages visited
  const history = useHistory();
  
/**
 * fetches details from param question and call the router function from backend and then render fresh data
 * @returns {void}
 */

  function RenderQues() {
    // Posting answer from back end router
    async function postAns(e) {
      e.preventDefault();
      try {
        if(body.length !== 0){
        // paramters required to send to backend routing function
        const ansBody = {
          body,
          Quesid: question._id,
          author: question.author,
          email: question.email,
        };

        // backend routing function invoked and rendered data fresh
        await axios.post("http://localhost:9000/ques/postAns", ansBody);
        console.log("req accepted")
        await getLoggedIn();
        window.location.reload();
        history.push("/ques/" + question._id);
          }
      else{
        seterr("Text area cannot be empty to post answer")
      }

      } catch (err) {
        // If non IITB member tries to post answer, verification fails for him/her and gets non authorised message
        if (err.response) {
          if (err.response.data.errorMessage) {
            seterr(err.response.data.errorMessage);
          }
        }
      }
    }

    // Returns html component for post answer feature
    return (
      <div>
        <div>

          <h3><span className="text-color">Post Your Answer</span></h3>
          <form onSubmit={postAns}>
            <div className="form-group ">

              <textarea
                className="form-control textarea"
                name="message"
                rows="5"
                cols="20"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
              <p className="error">{err}</p>
            </div>

            <button type="submit" >Post</button>

            );
          </form>

        </div>

      </div>
    );

  }
  return (
    <>
      {RenderQues()}
    </>
  );

}

// Exporting the Answer
export default Answer;
