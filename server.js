const express = require("express");
const morgan = require("morgan");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(morgan('dev'));
server.use(express.json());

server.use("/api/users", logger, userRouter);
server.use("/api/posts", logger, postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// custom middleware
// request method, request url, and a timestamp

function logger(req, res, next) {
  console.log(req.method, req.url, Date());
  next();
}

module.exports = server;
