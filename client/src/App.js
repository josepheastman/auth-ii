import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import "./App.css";

import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import Users from "./components/Users.js";

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/signup">Sign up</NavLink>
            <NavLink to="/signin">Sign in</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            {/* <button onClick={this.signout}>Sign out</button> */}
            <button onClick={this.signout}>
              <NavLink to="/signin">Sign out</NavLink>
            </button>
          </nav>
        </header>
        <main>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/users" component={Users} />
        </main>
      </>
    );
  }

  signout = () => {
    localStorage.removeItem("jwt");
  };
}

export default App;
