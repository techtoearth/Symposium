import React, { useContext ,useState } from "react";
import { Link } from 'react-router-dom';
import './homepage.css'
import AuthContext from "../../context/AuthContext";


/**
 * functional component which is used to render 

          *1)search functionality
          *2)render all the posted questions
          *3)render all the tags which are attached with the questions
 * @name Homepage
* @function HomePage
  * @param {Object} ques - Contains all the questions
 * @returns {html} - Returns Html pags

 */

function HomePage({ ques }) {

  //ques_forever : temp variable containing all the  questions
  const ques_forever=ques
  function getUniqueAfterMerge(arr1, arr2){

    // merge two arrays
    let arr = arr1.concat(arr2);

    //contains the unique values
    let uniqueArr = [];

    // loop through array and remove the duplicate questions
    for(let i of arr) {
        if(uniqueArr.indexOf(i) === -1) {
            uniqueArr.push(i);
        }
      }

    //returns the unique array of questions after removing duplicates
    return uniqueArr;
      }


  const data = useContext(AuthContext);

  //search : string variable which holds the value we have written in search input
  const [search, setSearch] = useState("");

  //ques1 : temprory array variable used to store the questions
  let ques1=[]

  //logging to check the values , whether our method is working or not
  console.log("searching.......",search)
  console.log(data)

  // here we are checking the type of ques by logging it to consoleconsole.log("type of :",typeof ques)
 /* searching logic */
 if(search.length > 0 ){

  //searchInp : an array , which we get after splitting our search value based on whitespace
  let searchInp=search.split(" ")

  //ques2 : temprory array variable used to store the questions
  let ques2=[]

  //here we are looping through the array we got after splitting our search value
  /**
   * logic: first we are converting each searched word into its lowercase
   *        then if it is not whitespace
   *        we will filter our ques_forever array of questions based on two conditions
   *        1) either any question contain that searched word 
   *        2) or tags of that questions contains the searched word
   */
  for(let s=0;s<searchInp.length;s++){
      
      // converting each searched word into its lowercase
      let input=searchInp[s].toLowerCase()

      //checking whether input is not a whitespace character
      if(input !== ""){

        /**
         * ques2 : a filtered array of questions 
         *          which either contains searched word in its title or in tis tags
         */
    ques2=(ques_forever.filter(que=>{
      return que.body.toLowerCase().includes(input.toLowerCase()) ||  (que.tags.filter((str) => str.toLowerCase().includes(input.toLowerCase())).length>0)
    }))
    }

    /**calling getUniqueAfterMerge function to merge ques1 and ques2 */
    ques1=getUniqueAfterMerge(ques1,ques2)
    
    //assigning merged and unique values (ques1) to ques which is our main array using which we are 
    //rendering the questions on the homepage
    ques=ques1
    console.log(ques1)
  }
  
}
   /**loggedIn : boolean variable
    * true : if user is logged in
    * false : if user is not logged in
    */
  const loggedIn = data.loggedIn
  
  /**
   * seachTo : object
   * contains key value pairs
   * 1) Key : pathname , value : url
   * 2) Key : search , value : search (containing all the related questions filtered based on our search string)
   */
  const searchTo = { 
    pathname: "/search", 
    search: search 
  };

  /**
   * 
   * @param {object} tags 
   * @returns {*} html div component
   */
  function rendertags(tags) {
    return (
      <>
       {/**
        * here we are using map function to iterate over tags array and render all the tags using span html tag   
        */ }
        {tags.map(function (tag, i) {
          return (<span key={i} className="text-color tags tag-box">{tag}</span>)
        })}
      </>
    )
  }


  /**
   * 
   * @returns  html div component in which there are several rows
   *           where in each row we are displaying title of the question, author of the question, 
   *           tags related to it , time when it was asked , its likes , views and count of total answers
   */
  function renderQues() {


    /**
     * here we are mapping question array , extracting each question and displaying it in the appropriate format in html 
     */
    return ques.map((qp, i) => {
      return (
        <div className="row questions question-row">
          <div className="col-8">
            <div className="row row-color ml-1">
              {/**  loggedIn boolean variable which is used to check whether user is logged in or not
               *    if yes then on clicking the question , a seperate page will get displayed for that particular page and all the related 
               *    answers will be displayed 
              */}
              {loggedIn === true && (
                <>
                  <p key={i} className="title"><Link to={"/ques/" + qp._id} className="link"> {qp.body}</Link></p>
                </>)
              }
              {loggedIn === undefined && (
                <>
                  <p key={i} ><Link to={"/login"} className="link"> {qp.body}</Link></p>
                </>)
              }
            </div>
            <div className="row">
              <div className="col-5 author">
                <p className="postby">  <span>{qp.author}</span> <span> &nbsp;  </span> <span>{qp.created_at}</span></p>
              </div>
              <div className="col-7">
                {/* here we are calling rendertags function to render an array of tags */}
                {rendertags(qp.tags)}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-3 mt-3 mr-1 questions box s">
                <span className="text-color">{qp.viewsCount}</span><br />
                <span className="text-color">Views</span>
              </div>
              <div className="col-3 mt-3 mr-1 questions box s">
                <span className="text-color">{qp.count_answers}</span><br />
                <p className="text-color">answers</p>
              </div>
              <div className="col-3 mt-3  questions box s">
                <span className="text-color">{qp.upVoteCount}</span><br />
                <span className="text-color">votes</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
    // console.log(ques)
  }
  return (
    <div>
      <div class="row input-group mb-3">
        <div class="input-group-append mb-3">
          <input type="text" class="form-control" 
            placeholder="Search by Tags" 
            aria-label="Recipient's username" 
            aria-describedby="basic-addon2"
            onChange={(e) => setSearch(e.target.value)} />
          <button class="btn btn-outline-secondary" type="button" ><span>
            <Link className="link" to={searchTo}  ><i class="fas fa-search"></i></Link>
          </span></button>
        </div>
      </div>
      {/* here we are calling renderQues function */}
      {renderQues()}
    </div>
  );
}

export default HomePage;