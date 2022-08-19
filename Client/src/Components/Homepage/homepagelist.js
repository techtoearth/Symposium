import axios from "axios";
import React, { useEffect, useState } from "react";
import Homepage from "./homepage"

/**
 * list of all questions rendered by homepage.js displayed with the question details
 * @function  Ques
 * @name Homepage List
 * @returns {html} html div component to render all things on the homepage
 */

function Ques() {
  console.log("running")

  /** ques: array variable , which we are using as a react hook (useState) ,in which we will store all the ques  */
  const [ques, setQues] = useState([]);

  /** addr: string variable , which we are using as a react hook (useState) , which contains the partial url address   */
  const [addr, setAddr] = useState('/');
    
  /** tags: array variable , which we are using as a react hook (useState) , which contains an array of tags  */
  const [tags, setTags] = useState([]);

  /**
   * setviewAddress : function
   *   this function sets the value of addr (useState) from default to '/view/'
   *   and then calls  getQues()
   *   Need: when we want to sort the questions based on views then we click on the views button 
   *         this function is then called 
   */
  function setviewAddress() {
    console.log("hii")
    setAddr('/view')
    console.log(addr);
    getQues();
  }
  
  /**
   * setvoteAddress : function
   *   this function sets the value of addr (useState) from default to '/vote/'
   *   and then calls  getQues()
   *   Need: when we want to sort the questions based on vote then we click on the vote button 
   *         this function is then called 
   */
  function setvoteAddress() {
    console.log("hii")
    setAddr('/vote')
    console.log(addr);
    getQues();
  }

  /**
   * setanswerAddress : function
   *   this function sets the value of addr (useState) from default to '/answ/'
   *   and then calls  getQues()
   *   Need: when we want to sort the questions based on number of answers then we click on the answer button 
   *         this function is then called 
   */

  function setanswerAddress() {
    console.log("hii")
    setAddr('/answ')
    console.log(addr);
    getQues();
  }

  /**
   * getQues : function
   *   in this function we first make a http get method request to the server using axios
   *   based on the url it then returns the question (either sorted based on the upper 3 parameters) or
   *   normally in the same way as stored in the database
   */
  async function getQues() {
    console.log("running")
    console.log("hii addrss")
    console.log("http://localhost:9000/ques", addr)
    const questions = await axios.get("http://localhost:9000/ques" + addr);

    // here we set the questions using react hook
    setQues(questions.data);
  }

  /**
   * useEffect is React LifeCycle method which is called when the page get mount
   * we need this effect to call getQues and to set the ques(useState (React Hook)) variable with all the questions
   * we get from the axios
   */
  useEffect(() => {
    getQues();
  }, []);

  /**
   * In this useEffect we implemented a function getTags
   * getTags : function 
   *     in this function we make a http post method call to the server using axios library
   *     in post method we pass 2 parameters 1) url 2) body
   *     
   *     Server in response gives a json object which contains all the tags which are used with atleast one of the 
   *     questions 
   *     Then we set the allTags array values with the data we get in the response from the server using react hook
   * Here async means asyncronous call 
   * and await means wait until we get the response , once we get the response then only execute the next line in 
   * sequence
   */
  useEffect(() => {
    async function getTags() {
      try{

        //body : a variable which we sends in the post method
        const body={
          mnl:"mnl"
        }
        // response : object which contain the response we get from the server
        const response= await axios.post("http://localhost:9000/ques/tagsSection",body)

        //alltags : object which contains key value pair of tag and its count 
        const alltags=response.data;

        // here we set the alltags value using setTags React Hook method
        setTags(alltags)
      }
      catch(err){
        console.log(err)
      }
    }
    getTags();
  }, []);

  /**
   * rendertags : function
   * @returns html span inline blocks of tags which we are displaying on homepage
   */
  function rendertags(){

    //object.enetries is the function which is used to iterate through the tags object which is a key-value pair
    return Object.entries(tags).map(([key,value])=>{
      return (
        <span className="text-color tags-box">
          {key}-{value}
        </span>
      )
    })
  }

  return (
    <div class="container-fluid s">

      
      <div className="row ml-5 mt-4 no-gutters">

        <span><button onClick={setviewAddress}>
            Views
          </button> </span>
        <span><button onClick={setvoteAddress}>
            Votes
          </button> </span>
        <span><button  onClick={setanswerAddress}>
            Answers
          </button></span>
        
      </div>



      <div class="row row-body">
        <div className="col-8 col-sm disp">
          <Homepage ques={ques} />
        </div>
        <div className="col-4 rendertags"> 
          <h4 className="text-color">All Tags</h4>
          {rendertags()}
        </div>
      </div>
    </div>
  );
}

export default Ques;