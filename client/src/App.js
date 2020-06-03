import React,{Suspense} from 'react';
// import './App.css';
import {Route, Switch} from 'react-router-dom'
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/Navbar/Navbar";
import Footer from "./views/Footer/Footer"
import Auth from './hoc/auth'
function App() {
  return (
    <Suspense>
    <NavBar/>
    <div className="App" style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
     <Switch>
       <Route exact path="/"  component={Auth(LandingPage,null)}/>
       <Route exact path="/login" component={Auth(LoginPage,false)}/>
       <Route exact path="/register" component={Auth(RegisterPage,false)} />
     </Switch>
    </div>
    <Footer/>
    </Suspense>
  );
}

export default App;
