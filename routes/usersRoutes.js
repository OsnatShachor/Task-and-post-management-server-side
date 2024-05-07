
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
//לשנות לPOST כדי שיהיה יותר בטיחותי?????????????????????????????????????????????????????????????????????????
// GET a single user by ID
// router.post("/login", async (req, res) => {
//   try {
//     const { userName, password } = req.body; // משיכת שם המשתמש והסיסמה מהגוף של הבקשה
//     const user = await controller.getUserByNamePassword(userName, password); // קריאה לפונקציה שמחפשת משתמש על פי שם משתמש וסיסמה
//     if (!user) {
//       return res.status(404).send({ error: "User not found" }); // אם לא נמצא משתמש עם הפרטים שנשלחו, מחזירים תשובת שגיאה
//     }
//     res.status(200).send(user); // אחרת, מחזירים את המשתמש שנמצא
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Failed to fetch user" }); // אם יש שגיאה במהלך החיפוש אחר המשתמש, מחזירים תשובת שגיאה
//   }
// });

router.get("/:userName", async (req, res) => {
  try {
    const password = req.params.userName;
    const user = await controller.getUserByUserName(password);
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
      const { userName, name, email, phone, company, password, street, city, zipcode} = req.body; // Assuming you meant to include completed
      console.log(userName, name, email, phone, company, password, street, city, zipcode);
      const response = await controller.createUser(userName, name, email, phone, company, password, street, city, zipcode);
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