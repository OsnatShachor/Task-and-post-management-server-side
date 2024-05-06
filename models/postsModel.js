const pool = require('../DB.js');

async function getAllPosts() {
  console.log("fgyyyyg");
    try {
      const sql = 'SELECT * FROM posts';
      console.log("111");
      const [rows, fields] = await pool.query(sql);
      console.log("222");
      console.log(rows);
      return rows;
    } catch (err) {
      console.log(err);
    }

}
async function getPost(ID) {
    try {
        const sql = 'SELECT * FROM posts where postID=?';

        const result = await pool.query(sql, [ID]);
        console.log("result", result);
        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}



async function createPost(userID, title, body) {
  try {
      const sql = `INSERT INTO posts (userID, title, body) VALUES (?, ?, ?)` ;
      const result = await pool.query(sql, [userID, title, body]);
      console.log("result",result);
      // return result[0][0];
      return true;

  } catch (err) {
      throw err;
  }
}



  async function deletePost(postID) {
    try {
        console.log("dd");
      const sql = `DELETE FROM posts WHERE postID = ?`;
      const result = await pool.query(sql, [postID]);
       return result[0][0];
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    }
  }
  async function updatePost(postID,userID, title, body) {
    try {
      const sql = `UPDATE posts SET userID = ?, title = ?, body = ? WHERE postID = ?`;
      const result = await pool.query(sql, [userID, title, body, postID]);
      return result[0][0];
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  }
module.exports = {getAllPosts, getPost, createPost, deletePost, updatePost}  