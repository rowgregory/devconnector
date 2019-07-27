const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const validation = require("./validationChecks");
const PostController = require("../../controllers/PostController");

const { createdPost } = validation;
const { createPost } = PostController;

/** @access    Private */
router.post("/", [auth, [createdPost]], createPost);

module.exports = router;
