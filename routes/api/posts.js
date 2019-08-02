const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const validation = require("./validationChecks");
const PostController = require("../../controllers/PostController");

const { createdPost } = validation;
const { createPost, getAllPosts, getPostById, deletePost } = PostController;

/** @access    Private */
router.post("/", [auth, [createdPost]], createPost);
router.get("/", auth, getAllPosts);
router.get("/:id", auth, getPostById);
router.delete("/:id", auth, deletePost);

module.exports = router;
