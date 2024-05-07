const pool = require('../DB.js');

async function getAllUsers() {
  try {
    const sql = 'SELECT userID, userName, name, email, phone, company,password,street,city,zipcode FROM addresses NATURAL JOIN users NATURAL JOIN passwords';
    const [rows, fields] = await pool.query(sql);
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
 
}
async function getUser(userName) {
  try {
    const sql = 'SELECT userID, userName, name, email, phone, company,password,street,city,zipcode FROM addresses INNER JOIN users ON addresses.addressID = users.addressID INNER JOIN passwords ON users.passwordID = passwords.passwordID WHERE users.userName = ?';
    const result = await pool.query(sql, [userName]);
    console.log("result", result);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function createUser(userName, name, email, phone, company, password, street, city, zipcode) {
  try {
      const insertPasswordSql = 'INSERT INTO passwords (password) VALUES (?)';
      const insertPasswordResult = await pool.query(insertPasswordSql, [password]);
      const sql1 = 'SELECT passwordID FROM passwords WHERE password = ?';
    const [passwordResult] = await pool.query(sql1, [password]);
    
      const insertAddressSql = 'INSERT INTO addresses (street, city, zipcode) VALUES (?, ?, ?)';
      const insertAddressResult = await pool.query(insertAddressSql, [street, city, zipcode]);
      const sql2 = 'SELECT addressID FROM addresses WHERE street = ? AND city = ? AND zipcode = ?';
      const [addressResult] = await pool.query(sql2, [street, city, zipcode]);
      // console.log(addressID);
    
      const addressID = addressResult[0].addressID;
const passwordID = passwordResult[0].passwordID;

    // מכניסים את המשתמש החדש לטבלת users עם הפרטים שנאספו
    const sql = `INSERT INTO users (userName, name, email, phone, addressID, company, passwordID) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await pool.query(sql, [userName, name, email, phone, addressID, company, passwordID]);
    console.log("result", result);
    return true;
  } catch (err) {
    throw err;
  }
}
//צריך לעשות GET גם עם PASSWORD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//מותר לי כל פעם בעדכון להביא גם את USERID???????????????????????????????????
// async function updateUser(userName, name, email, phone, company, password, street, city, zipcode) {
//   try {
//     const sql = `UPDATE users SET userName = ?, name = ?, email = ?, phone = ?, company = ? WHERE userName = ?`;
//     const result = await pool.query(sql, [userName, name, email, phone, addressID, company, userID]);
//     console.log(result);
//     return result;
//   } catch (err) {
//     console.error('Error updating user:', err);
//     throw err;
//   }
// }

// module.exports = { getAllUsers, getUser, createUser, updateUser }  
module.exports = { getAllUsers, getUser, createUser }  