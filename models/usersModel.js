const pool = require('../DB.js');

async function getAllUsers() {
  console.log("fgyyyyg");
  try {
    const sql = 'SELECT * FROM users';
    console.log("111");
    const [rows, fields] = await pool.query(sql);
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }

}
async function getUser(userName) {
  try {
    const sql = 'SELECT * FROM users where userName=?';
    const result = await pool.query(sql, [userName]);
    console.log("result", result);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function createUser( userName,name,email, phone, addressID, company) {
  try {
    const sql = `INSERT INTO users (userName,name,email, phone, addressID, company) VALUES (?, ?, ?, ? ,? ,? )`;
    const result = await pool.query(sql, [userName,name,email, phone, addressID, company]);
    console.log("result", result);
    // return result[0][0];
    return true;

  } catch (err) {
    throw err;
  }
}



async function deleteUser(userName) {
  //   try {
  //       console.log("dd");
  //     const sql = `DELETE FROM posts WHERE postID = ?`;
  //     console.log("dmm");
  //     const result = await pool.query(sql, [postID]);
  //      return result[0][0];
  //   } catch (err) {
  //     console.error('Error deleting post:', err);
  //     throw err;
  //   }
}
async function updateUser(postID, userID, title, body) {
  try {
    const sql = `UPDATE posts SET userID = ?, title = ?, body = ? WHERE postID = ?`;
    const result = await pool.query(sql, [userID, title, body, postID]);
    return result[0][0];
  } catch (err) {
    console.error('Error updating post:', err);
    throw err;
  }
}
module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost }  