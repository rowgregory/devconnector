const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const UserSchema = require("../../models/User");

/**
 * @route     POST api/users
 * @desc      Register user
 * @access    Public
 */
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    console.log(req.body, "REQ BODY");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await UserSchema.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: "User already exists " }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      // creates a new instance
      user = new User({
        name,
        email,
        avatar,
        password
      });
      // hash password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      // Save user in database
      await user.save();
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

    //
  }
);

module.exports = router;
