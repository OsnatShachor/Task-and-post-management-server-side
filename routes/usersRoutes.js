
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await controller.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

// GET a single user by ID
router.get("/:userName", async (req, res) => {
  try {
    const password = req.params.userName;
    const user = await controller.getUser(password);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch user" });
  }
});

router.post("/", async (req, res) => {
    try {
      const { userName,  name, email, phone, addressID, company} = req.body; // Assuming you meant to include completed
      console.log(userName,  name, email, phone, addressID, company);
      const response = await controller.createUser(userName,  name, email, phone, addressID, company);
      console.log(response);
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to create user" });
    }
  });
  

// PUT (update) an existing user by userName
router.put("/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const {  userID, name, email, phone, addressID, company} = req.body;
    console.log(userID,userName,  name, email, phone, addressID, company);
    await controller.updateUser(userID,userName, name, email, phone, addressID, company);
    const updatedUser = await controller.getUser(userName);
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update user" });
  }
});
//וואססס וואסס מה עושים??????????????????????????????????????????????????????????
//צריך למחוק מכל הטבלאות POSTID מפתח זר
// DELETE a post by ID
// router.delete("/:ID", async (req, res) => {
//     try {
//       const ID = req.params.ID;
//       const deletedPost = await controller.deletePost(ID);
//       if (!deletedPost) {
//         return res.status(404).send({ error: "Post not found" });
//       }
//       res.status(200).send({ message: "Post deleted successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: "Failed to delete post" });
//     }
//   });
  

module.exports = router;