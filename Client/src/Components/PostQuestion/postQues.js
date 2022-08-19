import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import './tagsInput.css'

/**
 * Posting a Question
 * @function PostQues
 * @name Post Question
 * @returns {html} - returns html component for posting a new question (only for logge in users)
 */

function PostQues() {
  // body: String. stores question body from text area input
  const [body, setBody] = useState("");
  // input: String. Stores a new tag on click for the taginput
  const [input, setInput] = useState('');
  // tags: Array. Stores all tags of the question
  const [tags, setTags] = useState([]);
  // err: String. Stores error message based on post question to render on browser based on some event
  const [err, seterr] = useState("");
  // errs: String. Stores error message based on post tags to render on browser based on some event
  const [errs, seterrs] = useState("");
  // isKeyReleased: Boolean. set to false only when tag is submitted by user
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  /**
   * onChange :EJS 5 function
   * @param {*} e here e denotes event driven actions
   * This function sets the input value (React hook(useState)) to the value we type in the post Question text area
   */
   const onChange = (e) => {

    //we save string we enter in input in value using react hook (useState)
    const { value } = e.target;
    setInput(value);
  };

  /**
   * onKeyDown
   * @param {*} e 
   * 
   */
  const onKeyDown = (e) => {

    //Key stores name of keyboard key which is being pressed
    const { key } = e;

    //we remove the front and end space from the input
    const trimmedInput = input.trim();

    if ((key === ',' || key === 'Enter')&& !tags.includes(trimmedInput) && trimmedInput.length ) {
      e.preventDefault();

      //here we update the tags array we appending the new tag with the previous tag array
      setTags(prevState => [...prevState, trimmedInput]);

      //now after appending we empty the value of input to take in new tag from the input
      setInput('');
    }

    //when we press Backspace ,which means we want to erase or update previous tag , its logic is being implemented here
    if (key === "Backspace"  && isKeyReleased && tags.length &&  !input.length) {
      e.preventDefault();

      //here we first copy the value of tags array which we have
      const tagsCopy = [...tags];

      //now we pop the last tag which we have in our array of tags
      const poppedTag = tagsCopy.pop();

      //now we set the tags array after removing the last tag and display this array on user end
      setTags(tagsCopy);

      //and at last we set the input value which has to be rendered in the input area with the last tag which either we 
      //have to delete or update 
      setInput(poppedTag);
    }

    //using react hook(useState) when we are done with the backspace key we set the key Release value to false 
    //to take more input or to perform more action
    setIsKeyReleased(false);
  };

  //whenever we press any key we use this EJS function and react hook to set the key Released variable to true
  const onKeyUp = () => {
    setIsKeyReleased(true);
  }

  //whenever we press the 'x' sign in the top right corner of tag it get deleted 
  //logic of deleting tag
  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }
  
  /**
   * Posting question from backend routing
   * @param {*} e - variable denotes event driven actions
   * @returns {void}
   */
  async function postQues(e) {
    e.preventDefault();
    // valid: Boolean. flag variable
    let valid = true;
    //body length should be > 0
    if (body.length == 0) {
      valid = false
      seterrs("question field should not be empty")
    }
    // number of tags should be > 0
    if (tags.length == 0) {
      valid = false;
      seterr("enter atleast one tag and max 5 tags")
    }
    // number of tags should be < 5 
    else if (tags.length > 5) {
      valid = false;
      seterr("maximum 5 tags are allowed")
    }
    // If satisfies all above conditions then invoke backend router sending body and tags as paramter
    if (valid) {
      try {
        /**
         * @param {{body: String, tags: Array}} - parameter to be sent to backend router
         */
        const quesBody = {
          body,
          tags
        };
        // invoking backend routing method
        await axios.post("http://localhost:9000/ques/PostQues", quesBody);
        await getLoggedIn();
        // Returning back to homepage
        history.push("/home");
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Returning the html component of posting question page
  return (
    <div className="container-fluid s">
      <h1 className="post"><span className="text-color">Post Your ques</span></h1>
      <form onSubmit={postQues}>
        <div className="form-group ">
          <textarea
            className="form-control textarea"
            name="message"
            rows="3"
            placeholder="Enter your question"
            onChange={(e) => setBody(e.target.value)}
            value={body}>
            The cat was playing in the garden.
          </textarea>
          {errs.length > 0 && <span className="error">{errs}</span>}
        </div>
        {/* <TagsInput/> */}
        <div className="container-fluid p-0">
          <div className="tg">
            {tags.map((tag, index) => (
              <div className="tag">
                {tag}
                <button onClick={() => deleteTag(index)}>x</button>
              </div>
            ))}
          </div>
          <div className=" form-group input-tag">
            <input
              class="form-control input-tag"
              type="text"
              value={input}
              placeholder="Enter a tag and hit enter or press comma"
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              onChange={onChange}
              data-role="tagsinput"
            />
          </div>
          {err.length > 0 && <span className="error">{err}</span>}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostQues;