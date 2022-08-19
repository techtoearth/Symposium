import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import './homepage.css'
import AuthContext from "../../context/AuthContext";


function SearchPage({ ques }) {
    const data = useContext(AuthContext);
    const [search, setSearch] = useState("");
    console.log("searching.......", search)
    console.log(data)

    // console.log("actve_client: ", loggedIn)

    const loggedIn = data.loggedIn

    const searchTo = {
        pathname: "/search",
        search: search
    };

    function rendertags(tags) {
        if (tags) {
            return (
                <>
                    {tags.map(function (tag, i) {
                        return (<span key={i} className="text-color tags tag-box">{tag}</span>)
                    })}
                </>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    }


    function renderQues() {
        if (ques.length > 0) {
            return ques.map((qp, i) => {
                console.log("see this :", qp)
                return (
                    <div className="row questions question-row">
                        <div className="col-8">
                            <div className="row row-color ml-1">
                                {/* <p key={i} ><Link to={"/ques/" + qp._id} className="link"> {qp.body}</Link></p> */}
                                {loggedIn === true && (
                                    <>
                                        <p key={i} className="title"><Link to={"/ques/" + qp.ques._id} className="link"> {qp.ques.body}</Link></p>
                                    </>)
                                }
                                {loggedIn === undefined && (
                                    <>
                                        <p key={i} ><Link to={"/login"} className="link"> {qp.ques.body}</Link></p>
                                    </>)
                                }
                            </div>
                            <div className="row">
                                <div className="col-5 author">
                                    <p className="postby">  <span>{qp.ques.author}</span></p>
                                </div>
                                <div className="col-7">
                                    {rendertags(qp.ques.tags)}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col-3 mt-3 mr-1 questions box s">
                                    <span className="text-color">{qp.ques.viewsCount}</span><br />
                                    <span className="text-color">Views</span>
                                </div>
                                <div className="col-3 mt-3 mr-1 questions box s">
                                    <span className="text-color">{qp.ques.count_answers}</span><br />
                                    <p className="text-color">answers</p>
                                </div>
                                <div className="col-3 mt-3  questions box s">
                                    <span className="text-color">{qp.ques.upVoteCount}</span><br />
                                    <span className="text-color">votes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        else {
            return (
                <>
                    <p className="text-color box-result">No Result found :(</p>
                </>
            )
        }
        // console.log(ques)
    }
    return (
        <div>

            {renderQues()}
        </div>
    );
}

export default SearchPage;