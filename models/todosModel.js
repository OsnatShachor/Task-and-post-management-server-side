const pool = require('../DB.js');

async function getAllTodos() {
    try {
      const sql = 'SELECT * FROM todos';
      const [rows, fields] = await pool.query(sql);
      console.log(rows);
      return rows;
    } catch (err) {
      console.log(err);
    }

}
async function getTodo(ID) {
    try {
        const sql = 'SELECT * FROM todos where todoID=?';

        const result = await pool.query(sql, [ID]);
        console.log("result", result);
        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}

async function createTodo(userID, title, completed) {
    try {
        const sql = `INSERT INTO todos (userID, title, completed) VALUES (?, ?, ?)` ;
        const result = await pool.query(sql, [userID, title, completed]);
        console.log("result",result);
        // return result[0][0];
        return true;

    } catch (err) {
        throw err;
    }
}
   async function deleteTodo(todoID) {
  //   try {
  //     const sql = `DELETE FROM todos WHERE todoID = ?`;
  //     const result = await pool.query(sql, [todoID]);
  //      return result[0][0];
  //   } catch (err) {
  //     console.error('Error deleting todo:', err);
  //     throw err;
  //   }
  }

  async function updateTodo(todoID,userID, title, completed) {
    try {
      const sql = `UPDATE todos SET userID = ?, title = ?, completed = ? WHERE todoID = ?`;
      const result = await pool.query(sql, [userID, title, completed, todoID]);
      return result[0][0];
    } catch (err) {
      console.error('Error updating todo:', err);
      throw err;
    }
  }
module.exports = {getAllTodos, getTodo, createTodo, deleteTodo, updateTodo}  