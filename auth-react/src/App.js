import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import axios from "axios";

import SignupForm from "./components/Signup.js";
import Users from "./components/Users";

const url = new URL("http://localhost:5000/api/users/");
