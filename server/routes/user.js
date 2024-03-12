const express = require("express");
const router = express.Router();
const { generateUsername } = require("unique-username-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  const { email, password, avatar, country } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log("hashedPass", hashedPassword);

    const uniqueUsername = generateUsername();
    // console.log("unique_username", uniqueUsername);

    let default_profilePicture_Url = "https://unavatar.io/github/yr-coder";
    if (avatar) {
      console.log(avatar);
      default_profilePicture_Url = avatar;
    }
    console.log(default_profilePicture_Url);

    const newUser = await User.create({
      password: hashedPassword,
      email,
      username: uniqueUsername,
      avatar: default_profilePicture_Url,
      country,
    });
    console.log(newUser);

    return res.status(200).json({ isRegistered: true, user: newUser });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(200).json({ isLoggedIn: true, user: user, token: token });
  } catch (error) {
    return res.status(401).json({ message: "Login Error" });
  }
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(401).json({ message: "User doesn't exists" });
  }
  

  return res.status(200).json({ user: user });
});

router.get("/users", async (req, res) => {
  const users = await User.find({});

  return res.status(200).json({ users });
});
router.get('/rankings', async (req, res) => {
  try {
      const users = await User.find({}); // Retrieve all users

      // Calculate total points earned for each user and create an array of user objects with pointsEarned
      const rankedUsers = users.map(user => {
          const pointsEarned = user.solved_challenges.reduce((totalPoints, challenge) => {
              return totalPoints + challenge.point;
          }, 0);
          return {
              _id: user._id,
              username: user.username,
              pointsEarned: pointsEarned,
              email:user?.email
          };
      });

      // Sort users based on pointsEarned in descending order
      rankedUsers.sort((a, b) => b.pointsEarned - a.pointsEarned);

      // Assign ranks to users based on their position in the sorted list
      rankedUsers.forEach((user, index) => {
          user.rank = index + 1; // Assign rank (1-based index)
      });

      res.status(200).json({ rankings: rankedUsers });
  } catch (error) {
      console.error("Error fetching user rankings:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
