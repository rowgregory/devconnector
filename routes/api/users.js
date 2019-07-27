const express = require("express");
const router = express.Router();

const UsersController = require("../../controllers/UsersController");

const validation = require("./validationChecks");

const { createNewUser } = UsersController;

const { registerUser } = validation;

/** @access Public */
router.post("/", [registerUser], createNewUser);

module.exports = router;
