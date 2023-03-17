const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { connectMongoDb, getDb } = require("./util/database");
const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.findbyId("641352a7acd9c04b015def0e");
    req.user = new User(user._id, user.username, user.email, user.cart);
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

(async () => {
  await connectMongoDb();

  // const db = getDb();
  // const users = await db.collection("users").find().toArray();
  // if (users.length === 0) {
  //   const user = new User(
  //     null,
  //     process.env.USERDB_USERNAME,
  //     process.env.USERDB_EMAIL
  //   );
  //   const result = await user.save();
  // }

  app.listen(3000);
})();
