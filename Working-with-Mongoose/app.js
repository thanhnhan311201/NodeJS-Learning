const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
    const user = await User.findById("641486aa69672354f08db143");
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

(async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.caidtma.mongodb.net/shop?retryWrites=true&w=majority`
  );
  const user = await User.findOne();
  if (!user) {
    const user = new User({
      name: process.env.USERDB_USERNAME,
      email: process.env.USERDB_EMAIL,
      cart: { items: [] },
    });
    await user.save();
  }
  app.listen(3000);
})();
