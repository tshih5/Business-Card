import logo from './logo.svg';
import './App.css';
import { Nav, Navbar} from "react-bootstrap";
import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import store from './store/configureStore';
import SignUpForm from "./components/Signupform";
import LoginForm from "./components/Loginform";
import Profile from "./components/Profile";

import {logout} from "./actions/auth";


function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };


  return (
      <div className="wrapper">
            {!currentUser? (
              <Navbar bg="light" expand="lg">
                <Nav className="mr-sm-6">
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Log In</Nav.Link>
                </Nav>
              </Navbar>
            ) : (
              <Navbar bg="light" expand="lg">
              <Nav className="mr-sm-6">
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={logOut}>Log Out</Nav.Link>
              </Nav>
              </Navbar>
            )}
        <div className="site-content">
          <Switch>
            <Route path="/login">
              <LoginForm/>
            </Route>
            <Route path="/signup">
              <SignUpForm/>
            </Route>
            <Route path="/profile">
              <Profile/>
            </Route>
          </Switch>
        </div>
      </div>
  );
}

export default App;