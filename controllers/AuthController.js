const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const AuthController = {
  getAuthenticatedUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever error");
    }
  },

  authenticateUserAndGetToken: async (req, res) => {
    console.log(req.body, "REQ BODY");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ erros: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ erros: [{ msg: "Invalid credentials" }] });
      }

      // get the payload
      const payload = {
        user: {
          id: user.id
        }
      };
      // pass in payload, secret, expiration, inside callback we get token or error
      // token gets sent back to client
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = AuthController;
