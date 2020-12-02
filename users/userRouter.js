const express = require("express");
const User = require("./userDb");

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
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// routers

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  User.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving users",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get("/:id/posts", validateUserId, (req, res) => {
  User.getUserPosts(req.params.id).then(posts => {
    res.status(200).json(posts)
  }).catch(error => {
    console.log(error)
    res.status(500).json({ message: "Error retrieving posts" })
  })
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});



module.exports = router;
