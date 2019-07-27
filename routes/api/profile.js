const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const ProfileController = require("../../controllers/ProfileController");
const validations = require("./validationChecks");

const { createOrUpdate, addedExperience, addedEducation } = validations;

const {
  getLoggedInUserProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getUserById,
  deleteUser,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getGithubRepos
} = ProfileController;

/** @access Private */
router.get("/me", auth, getLoggedInUserProfile);
router.post("/", [auth, [createOrUpdate]], createOrUpdateProfile);
router.put("/education", [auth, [addedEducation]], addEducation);
router.put("/experience", [auth, [addedExperience]], addExperience);
router.delete("/", auth, deleteUser);
router.delete("/experience/:exp_id", auth, deleteExperience);
router.delete("/education/:edu_id", auth, deleteEducation);

/** @access Public */
router.get("/github/:username", getGithubRepos);
router.get("/user/:user_id", getUserById);
router.get("/", getAllProfiles);

module.exports = router;
