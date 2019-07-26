const Profile = require("../models/Profile");
const User = require("../models/User");

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
  }
};

module.exports = ProfileController;
