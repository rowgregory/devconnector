const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const AuthController = require("../../controllers/AuthController");
const validation = require("./validationChecks");

const { getAuthenticatedUser, authenticateUserAndGetToken } = AuthController;

const { authenticatedUserAndToken } = validation;

/** @access Public */
router.get("/", auth, getAuthenticatedUser);
router.post("/", [authenticatedUserAndToken], authenticateUserAndGetToken);

module.exports = router;
