const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("First request handler.");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Second request handler.");
//   res.send("<h1>Handle request succesfully!</h1>");
// });

app.use("/user", (req, res, next) => {
  res.send("<h1>This is user page.</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>This is home page.</h1>");
});

app.listen(3000);
