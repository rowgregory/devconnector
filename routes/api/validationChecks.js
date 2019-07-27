const { check } = require("express-validator");

const createOrUpdate = [
  check("status", "Status is required")
    .not()
    .isEmpty(),
  check("skills", "Skills is required")
    .not()
    .isEmpty()
];

const addedExperience = [
  check("title", "Title is required")
    .not()
    .isEmpty(),
  check("company", "Company is required")
    .not()
    .isEmpty(),
  check("from", "From date is required")
    .not()
    .isEmpty()
];

const addedEducation = [
  check("school", "School is required")
    .not()
    .isEmpty(),
  check("degree", "Degree is required")
    .not()
    .isEmpty(),
  check("fieldofstudy", "Field of study is required")
    .not()
    .isEmpty(),
  check("from", "From date is required")
    .not()
    .isEmpty()
];

const registerUser = [
  check("name", "Name is required")
    .not()
    .isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 })
];

const authenticatedUserAndToken = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists()
];

module.exports = {
  createOrUpdate,
  addedExperience,
  addedEducation,
  registerUser,
  authenticatedUserAndToken
};
