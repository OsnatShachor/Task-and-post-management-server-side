
const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentsController");

// GET all comments
router.get("/", async (req, res) => {
    console.log("1234");
  try {
    const comments = await controller.getAllComments();
    res.status(200).send(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch comments" });
  }
});


// GET a single comment by ID
router.get("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const comment = await controller.getComment(ID);
    if (!comment) {
      return res.status(404).send({ error: "Comment not found" });
    }
    res.status(200).send(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch comment" });
  }
});

router.post("/", async (req, res) => {
    try {
      const { postID, body, email,commentName } = req.body; // Assuming you meant to include completed
      const response = await controller.createComment(postID, body, email,commentName);
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to create comment" });
    }
  });
 

// PUT (update) an existing comment by ID
router.put("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const { postID, body, email,commentName } = req.body;
    console.log(ID);
    await controller.updateComment(ID,postID, body, email,commentName);
    const updatedComment = await controller.getComment(ID);
    if (!updatedComment) {
      return res.status(404).send({ error: "Comment not found" });
    }
    res.status(200).send(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update Comment" });
  }
});
router.delete("/:ID", async (req, res) => {
    try {
      const ID = req.params.ID;

      const result = await await controller.deleteComment(ID);
      if (result === false) {
        return res.status(404).send({ error: "Comment not found" });
      }
      res.status(200).send({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to delete Comment" });
    }
  });
 

module.exports = router;
