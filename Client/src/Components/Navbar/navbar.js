import React, { useContext } from "react";
import axios from "axios";
import './navbar.css';
import { useHistory, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from "../../context/AuthContext";


/**
 * Creating navigation bar
 * @function NavBar
 * @name Navigation Bar
 * @returns {html} - returns html component for navigation bars. navigation bar will be different fo logged out and logged in users
 */

export default function NavBar() {
    const data = useContext(AuthContext);
    const loggedIn = data.loggedIn
    console.log("logged in", loggedIn)
    const getLoggedIn = data.getLoggedIn
    const history = useHistory();

    /**
     * On click of logout, direct to the homepage
     * @returns {void} 
     */

    async function handleClick() {
        await axios.get("http://localhost:9000/auth/logout");
        await getLoggedIn();
        history.push("/home");
    }
    // Returns the html component for navigation bar
    return (
        <>
         {/* Displays Website Name, Home and About page in the navigation bar  */}
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <a className="navbar-brand" href="#"><span className="text-color Symposium">Symposium</span></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home"><span className="text-color"> Home </span>  <span className="sr-only">(current)</span></Link>
                        </li>
                      

                    </ul>
                    
                    <ul className="navbar-nav me-auto">
                        {/* If user is not logged in, it displays login, register page in the navigation bar */}
                        {loggedIn === undefined && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/login'><span className="text-color">Login</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/register'><span className="text-color">Register</span></Link>
                                </li>
                            </>)
                        }
                        {/* If user is logged in, it displays post question and logout(in drop down) in the navigation bar */}
                        {loggedIn === true && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to='/postQues'><span className="text-color">Post Your Ques</span></Link></li>
                                <div class="dropdown drop me-auto">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-caret-down" aria-hidden="true"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown" aria-labelledby="dropdownMenuButton">
                                        {/* <li className="nav-item"><Link className="nav-link" to='/#'><span>Profile</span></Link></li> */}
                                        <li><Link className="nav-link" to="/home" onClick={handleClick} ><span>Log Out</span></Link></li>
                                    </div>
                                </div>

                            </>
                        )
                        }
                    </ul>
                </div>
            </nav>
        </>
    );

}