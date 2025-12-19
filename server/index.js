const express = require('express');
const cors = require('cors');
const db = require('./db/db.js');

require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN_URL
  })
);
app.use(express.json());

const userRouter = require('./routes/user');
app.use('/api', userRouter);

// app.post("/api/users", (req, res) => {
//   const { name } = req.body;
//   const insert = db.prepare("INSERT INTO users (name) VALUES (?)");
//   insert.run(name);
//   res.status(201).json({ id: insert.lastInsertRowid, name });
// });

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
  console.log('db', db);
});
