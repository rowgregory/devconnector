const Profile = require("../models/Profile");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

const ProfileController = {
  getUserById: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id
      }).populate("user", ["name", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(400).json({ msg: "Profile not found" });
      }
      res.status(500).send("Server error");
    }
  },

  deleteUser: async (req, res) => {
    try {
      await Profile.findOneAndRemove({ user: req.user.id });
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: "User deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },

  addExperience: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // adds new experience to the beginning
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  deleteExperience: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get correct experience
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  addEducation: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // adds new experience to the beginning
      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  deleteEducation: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get correct experience
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  getGithubRepos: (req, res) => {
    try {
      const options = {
        uri: `https://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc
        &client_id=${config.get("githubClientId")}
        &client_secret=${config.get("githubClientSecret")}`,
        method: "GET",
        headers: { "user-agent": "node.js" }
      };

      request(options, (error, response, body) => {
        if (error) console.error(error);

        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: "No Github profile found" });
        }

        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
};

module.exports = ProfileController;
