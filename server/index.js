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

app.listen(process.env.API_PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.API_PORT || 4000}`);
  console.log('db', db);
});
