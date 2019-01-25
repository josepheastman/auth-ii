import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import styled from "styled-components";

import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import Users from "./components/Users.js";

const StyledApp = styled.div`
  margin-left: 700px;
  margin-top: 80px;
  width: 500px;
  height: 300px;
  //   border: 5px solid #f6c193;
  border: 5px solid #6e8dc1;
  //   background-color: #81f0e1;
  background-color: #aec6f0;
`;

const StyledDiv = styled.div`
  margin-top: 50px;
  margin-left: 130px;
`;

class App extends Component {
  render() {
    return (
      <StyledApp>
        <StyledDiv>
          <header>
            <nav>
              <NavLink
                to="/signup"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textDecoration: "none",
                  marginRight: "20px"
                }}
              >
                Sign up
              </NavLink>
              <NavLink
                to="/signin"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textDecoration: "none"
                }}
              >
                Sign in
              </NavLink>
              &nbsp;|&nbsp;
              <NavLink
                to="/users"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textDecoration: "none",
                  marginRight: "20px"
                }}
              >
                Users
              </NavLink>
              {/* <button onClick={this.signout}>Sign out</button> */}
              <button onClick={this.signout}>
                <NavLink
                  to="/signin"
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    textDecoration: "none"
                    // marginRight: "20px"
                  }}
                >
                  Sign out
                </NavLink>
              </button>
            </nav>
          </header>
          <main>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/users" component={Users} />
          </main>
        </StyledDiv>
      </StyledApp>
    );
  }

  signout = () => {
    localStorage.removeItem("jwt");
  };
}

export default App;
