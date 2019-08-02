const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const validation = require("./validationChecks");
const PostController = require("../../controllers/PostController");

const { createdPost } = validation;
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment
} = PostController;

/** @access    Private */
router.get("/", auth, getAllPosts);
router.get("/:id", auth, getPostById);
router.post("/", [auth, [createdPost]], createPost);
router.post("/comment/:id", [auth, [createdPost]], commentOnPost);
router.put("/like/:id", auth, likePost);
router.put("/unlike/:id", auth, unlikePost);
router.delete("/:id", auth, deletePost);
router.delete("/comment/:id/:comment_id", auth, deleteComment);

module.exports = router;
