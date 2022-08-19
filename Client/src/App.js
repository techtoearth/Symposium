import React, { useContext } from "react";
import { Redirect,BrowserRouter, Route,Switch } from 'react-router-dom';
import Ques from "./Components/Homepage/homepagelist";
import Login from "./Components/Login/login";
import Navbar from "./Components/Navbar/navbar";
import Register from "./Components/Register/register";
import PostQues from "./Components/PostQuestion/postQues"
// import LogOutBtn from "./Components/Logout/logout";
import QuestionPage from "./Components/QuesPage/quesPage";
import SearchQues from "./Components/Homepage/SearchPage";
import axios from "axios";
//import { AuthContextProvider } from "./context/AuthContext"
import AuthContext from "./context/AuthContext";
axios.defaults.withCredentials = true;

/**
 * Create routes and add navigation 
 * @function App
 * @name App
 * @returns {Object} - returns navigation bars
 */

function App() {
  const  data = useContext(AuthContext);
  const loggedIn=data.loggedIn

  return (
  
    <BrowserRouter>
      <Navbar />
      <Switch>
      <Route exact path="/" render={() => (
        <Redirect to="/home"/>)}/>
      <Route path='/ques/:id' component={QuestionPage}/>
      <Route  path='/home' component={Ques} />
      <Route  path='/search' component={SearchQues} />
      <Route path='/tagsSection' component={Ques}/>s
      {
        loggedIn===undefined && (
          <>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          </>
        )
      }
      {/* <Route path='/login' component={Login} />
          <Route path='/register' component={Register} /> */}
     {loggedIn===true && (
       <>
       <Route path='/postQues' component={PostQues} />
       </>
     )}
     

      </Switch>
    </BrowserRouter>
);
    }

    export default App;