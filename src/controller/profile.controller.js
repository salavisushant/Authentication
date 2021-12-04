const express = require("express");

const Profile = require("../models/profile.model");

const authenticate = require("../midddlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const user = req.user;

    const profile = await Profile.create({
      position: req.body.position,
      age: req.body.age,
      user: user.user._id,
    });

    return res.status(201).json({ profile });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/", async (req, res) => {
  const profile = await Profile.find().lean().exec();

  return res.send(profile);
});

module.exports = router;
