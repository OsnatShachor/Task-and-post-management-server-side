const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const cors = require('cors');
app.use(cors());

// קוד אחר מכאן...

//---------------------------------------------------------לא לשכוח!!!!!-----------------------------------
//לעשות פונקציית מחיקה ב USER POSTS כי זה מפתח זר
//USER: לבדוק מה לעשות עם JOIN וזה משנה את כל הפונקציות כי הכנסנו ADDRESSID
//להחזיר סטטוסים עם שגיאות והצלחות








// const users = [
//   { email: '1@gmail.com', password: '123' },
//   { email: 'user2@example.com', password: 'password2' },
//   { email: 'user3@example.com', password: 'password3' }
// ];

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/public/logIn.js', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'logIn.js'));
// });
// app.get('/public/signUp.js', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'signUp.js'));
// });
// app.get('/public/Style.css', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'Lists.css'));
// });
// app.get('/logIn', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'logIn.html'));
// });
// app.get('/signIn', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'signIn.html'));
// });

// app.post("/signUp", (req, res) => {
//   const newUser = {
//     email: req.body.email,a
//     password: req.body.password
//   };
//   users.push(newUser);
//   res.status(200).send("Sign in success");
// });
// app.get('/logIn/:email', (req, res) => {
//    const user=users.find(u=>u.email=req.params.email)
//    if(!user)
//   return res.status(404).send("the user doesnt find");
//   res.send(user);
// });

const postsRouter = require("./routes/postsRoutes")
app.use("/posts", postsRouter);
console.log(typeof postsRouter);

const todosRouter = require("./routes/todosRoutes")
app.use("/todos", todosRouter);

const usersRouter = require("./routes/usersRoutes")
app.use("/users", usersRouter);
const commentsRouter = require("./routes/commentsRoutes")
app.use("/comments", commentsRouter);

// app.get('/', (req,res) => { res.send("goodluck!!! omeyn!!"); })
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
