
const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController");

// GET all posts
router.get("/", async (req, res) => {
  try {
    console.log(1);
    const posts = await controller.getAllPosts();
    res.status(200).send(posts);
  } catch (error) {
    console.log(2);
    console.error(error);
    res.status(500).send({ error: "Failed to fetch posts" });
  }
});

// GET a single post by ID
router.get("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const post = await controller.getPost(ID);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch post" });
  }
});

// POST a new post-create
router.post("/", async (req, res) => {
  try {
    console.log(1);
    const { userID, title, body } = req.body;
    console.log(userID, title, body);
    const response = await controller.createPost(userID, title, body);
    console.log(response);
    // const newPost = await controller.getPost(response.insertID);
    // res.status(201).send(newPost);
    res.status(201).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create post" });
  }
});

// PUT (update) an existing post by ID
router.put("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const { userID, title, body } = req.body;
    console.log(ID, userID, title, body);
    await controller.updatePost(ID, userID, title, body);
    const updatedPost = await controller.getPost(ID);
    if (!updatedPost) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update post" });
  }
});
//וואססס וואסס מה עושים??????????????????????????????????????????????????????????
//צריך למחוק מכל הטבלאות POSTID מפתח זר
// DELETE a post by ID
// router.delete("/:ID", async (req, res) => {
//     try {
//        const ID = req.params.ID;
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