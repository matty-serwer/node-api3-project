const express = require("express");
const User = require("./userDb");
const Post = require("../posts/postDb");

const router = express.Router();

//custom middleware

const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    if (!user) {
      res.status(404).json({ message: "Invalid user id" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user from database",
    });
  }
};

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

// routers

router.post("/", validateUser, (req, res) => {
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server error posting new user" });
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
  req.body.user_id = req.params.id;
  Post.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error making post" });
    });
});

router.get("/", (req, res) => {
  User.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Server error retrieving users",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving posts" });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

module.exports = router;
