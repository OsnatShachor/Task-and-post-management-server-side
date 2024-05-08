
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

// GET all users
router.get("/", async (req, res) => {
    const userName = req.query.userName;
    console.log("ttt");
    console.log(userName);
    if(userName){
      try {
        const user = await controller.getUserByUserName(userName);
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch user" });
      }
    }
    else{    try {
       const users = await controller.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch users" });
  }}

});


// router.get("/:userName", async (req, res) => {
//   try {

//     const userName = req.query.userName;
//     const user = await controller.getUserByUserName(userName);
//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }
//     res.status(200).send(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Failed to fetch user" });
//   }
// });

router.post("/", async (req, res) => {
  let user = {};
  const userName = req.query.userName;
  const password = req.query.password;
  console.log(userName);
  console.log(password);
  if (userName)
      if (password) {
          user = await controller.getUserByNamePassword(password, userName);
          console.log(user);
          if(user.userName)
              {
                  delete user.addressID;
                  delete user.passwordID;
              }
      }

      else {
        try {
          const { userName, name, email, phone, company, password, street, city, zipcode} = req.body; // Assuming you meant to include completed
          console.log(userName, name, email, phone, company, password, street, city, zipcode);
          const response = await controller.createUser(userName, name, email, phone, company, password, street, city, zipcode);
          console.log(response);
          res.status(201).send(response);
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: "Failed to create user" });
        }
      }
  res.send(user);
});

// router.post("/", async (req, res) => {
//     try {
//       const { userName, name, email, phone, company, password, street, city, zipcode} = req.body; // Assuming you meant to include completed
//       console.log(userName, name, email, phone, company, password, street, city, zipcode);
//       const response = await controller.createUser(userName, name, email, phone, company, password, street, city, zipcode);
//       console.log(response);
//       res.status(201).send(response);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: "Failed to create user" });
//     }
//   });
  

// PUT (update) an existing user by userName
router.put("/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const {  userID, name, email, phone, addressID, company} = req.body;
    console.log(userID,userName,  name, email, phone, addressID, company);
    await controller.updateUser(userID,userName, name, email, phone, addressID, company);
    const updatedUser = await controller.getUserByUserName(userName);
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update user" });
  }
});


module.exports = router;