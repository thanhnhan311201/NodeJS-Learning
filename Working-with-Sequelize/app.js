const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  (async () => {
    try {
      const user = await User.findByPk(1);
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
    }
  })();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelte: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

(async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({
        name: "Nhan Phan",
        email: "nhanphan@gmail.com",
      });
    }
    let cart = await user.getCart();
    if (!cart) {
      cart = await user.createCart();
    }
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
})();
