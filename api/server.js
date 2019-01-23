require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("../knexfile.js");

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

//// ** helper functions **
function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name,
    roles: ["admin", "clerk"]
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "45m"
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
}

//// ** ENDPOINTS **
server.post("/api/register", (req, res) => {
  const userInfo = req.body;

  const hash = bcrypt.hashSync(userInfo.password, 12);

  userInfo.password = hash;

  db("users")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({
        error: "Error registering user to the database."
      });
    });
});

server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "You shall not pass!!" });
      }
    })
    .catch(err => res.status(500).json({ message: "Error logging in." }));
});

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "password", "department")
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "User information could not be retrieved." })
    );
});

module.exports = server;
