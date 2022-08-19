import axios from "axios";
import React, { useParams, useEffect, useState } from "react";
import Answer from './answer_individual';
import DispAnswer from './dispanswer';
import "../Homepage/homepage.css"

/**
 * Rendering tags for a Question
 * @name Display Tags For Selected Question
 * @function rendertags
 * @param {Array} tags - array of tags for a question 
 * @returns {html} - returns html component for rendering tags
 */

function rendertags(tags) {
  // if there are one or more tags then render on the question page
  if (tags) {
    return (
      <>
        {tags.map(function (tag, i) {
          return (<span key={i} className="text-color tags tag-box">{tag}</span>)
        })}
      </>
    )
  }
}

/**
 * Rendering question, likes and views feature for a Question
 * @function QuestionPage
 * @param {ObjectSchema} props - individual question 
 * @returns {html} - returns html component for rendering question, likes and views
 */

function QuestionPage(props) {
  // id: question id
  const { id } = props.match.params
  // create useState for storing question from the parameter.
  const [question, setQuestion] = useState(false);
  // like: number. create useState for storing count of likes
  const [like, Setlike] = useState(0)
  // Tags: number. create useState for storing tags of question
  const [Tags, SetTags] = useState(0)

  // Fetching question from backend by sending question id as parameter
  /**
   * Fetching question from backend by sending question id as parameter
   * @function fetchQuestion
   * @name fetchQuestion
   * @returns {void}
   */
  async function fetchQuestion() {
    // Fetching question document by invoking routing function
    axios
      .get("http://localhost:9000/ques/" + id)
      .then((response) => {
        setQuestion(response.data);
        SetTags(response.data.tags);
      });
  }
  // invoking upvote function from backend router
  /**
   * invoking upvote function from backend router
   * @function OnLike
   * @name OnLike
   * @returns {void}
   */
  function OnLike() {
    axios.get("http://localhost:9000/ques/upVote/" + id).then((response) => {
      Setlike(response.data.upVoteCount)
    }).catch((err) => { console.log(err) })
  }

  // Returning html component
  useEffect(() => fetchQuestion(), [like]);
  return (
    <div className="quest">
      <div className="row">
        <div className="col-1">
          <button onClick={OnLike}><i class="fa fa-thumbs-up"></i></button><br />
          <span className="text-color view">Votes : {question.upVoteCount}</span><br />
          <span className="text-color view">views : {question.viewsCount}</span>
        </div>
        <div className="col">
          <p className="text-color title">{question.body}</p>
          <div className="row quest-body">
            <div className="col-4">
              <span className="text-color postby">asked by {question.author}</span> <span className="text-color postby">{question.created_at}</span>
            </div>
            <div className="col-4">
              {rendertags(question.tags)}
            </div>
            <div className="col-2">
            </div>
          </div>
        </div>
      </div>
      <hr class="my-4 mt-5" />
      {/* calling display answers by sending question object as parameter */}
      {<DispAnswer question={question}></DispAnswer>}
      {/* calling post answer module by sending question object as parameter */}
      {<Answer question={question}></Answer>}
    </div>
  )

}

export default QuestionPage;
