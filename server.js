const express = require('express');
const cors = require('cors');
const pool =require('pg');
const app = express();

const port = 8000;

app.use(cors());


app.use(express.json());

const todoRouter= require('./router/todo');
app.use('/todo',todoRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  console.log(`Example of listening on port ${port}`);
});

// const express = require("express");
// const app = express();
// const { Pool } = require('pg');

// const port = 8000;
// app.use(express.json());

// const todoRouter = require("./router/route");
// app.use("/api", todoRouter);

// // Start server
// app.listen(port, () => {
//     console.log(`Server running on :${port}`);
//   });
