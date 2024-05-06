
const express = require("express");
const router = express.Router();
const controller = require("../controllers/todosController");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await controller.getAllTodos();
    res.status(200).send(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch todos" });
  }
});

// GET a single todo by ID
router.get("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const todo = await controller.getTodo(ID);
    if (!todo) {
      return res.status(404).send({ error: "Todo not found" });
    }
    res.status(200).send(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch todo" });
  }
});

router.post("/", async (req, res) => {
    try {
      const { userID, title, completed } = req.body; // Assuming you meant to include completed
      console.log(userID, title, completed);
      const response = await controller.createTodo(userID, title, completed);
      console.log(response);
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to create todo" });
    }
  });
  

// PUT (update) an existing todo by ID
router.put("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const { userID, title, completed } = req.body;
    console.log(ID, userID, title, completed);
    await controller.updateTodo(ID, userID, title, completed);
    const updatedTodo = await controller.getTodo(ID);
    if (!updatedTodo) {
      return res.status(404).send({ error: "Todo not found" });
    }
    res.status(200).send(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update todo" });
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