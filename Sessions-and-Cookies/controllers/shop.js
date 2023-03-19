const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

exports.getProducts = (req, res, next) => {
  (async () => {
    try {
      const products = await Product.find();
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.getProduct = (req, res, next) => {
  (async () => {
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
      isAuthenticated: req.user,
    });
  })();
};

exports.getIndex = (req, res, next) => {
  (async () => {
    try {
      const products = await Product.find();
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.getCart = async (req, res, next) => {
  try {
    user = await req.user.populate("cart.items.productId");
    const items = user.cart.items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      items: items,
      isAuthenticated: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postCart = (req, res, next) => {
  (async () => {
    try {
      const prodId = req.body.productId;
      const product = await Product.findById(prodId);
      const result = await req.user.addToCart(product);
      res.redirect("/cart");
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.postCartDeleteProduct = (req, res, next) => {
  (async () => {
    try {
      const prodId = req.body.productId;
      const result = await req.user.removeFromCart(prodId);
      res.redirect("/cart");
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.postOrder = async (req, res, next) => {
  try {
    user = await req.user.populate("cart.items.productId");
    const items = user.cart.items.map((item) => ({
      product: { ...item.productId._doc },
      quantity: item.quantity,
    }));
    const order = new Order({
      products: items,
      user: { name: req.user.name, userId: req.user },
    });
    const result = await order.save();
    await user.cleanCart();
    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id });
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
      isAuthenticated: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    isAuthenticated: req.user,
  });
};
