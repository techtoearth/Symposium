
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchPageList from './SearchPageList'
// import CustomerList from "./CustomerList";

function SearchQues(props) {
    console.log(" search running")
    const [ques, setQues] = useState([]);
    const search1 = props.location.search;
    const search=search1.substring(1)
    console.log(search)

    async function getQues() {
        console.log("running")
        console.log("hii addrss")
        console.log("http://localhost:9000/ques/search")

        const searchData = {
            search
          };
        
        const questions = await axios.post("http://localhost:9000/ques/search",searchData);
        console.log("succes:", questions)
        setQues(questions.data);
      }
      useEffect(() => {
        getQues();
    
      }, []);

    return (
        <div class="container-fluid">
            <div className="row text-color search-result-box">Your search Result</div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <SearchPageList ques={ques}></SearchPageList>
                </div>
            </div>
        </div>
  );
}

export default SearchQues;