const Product = require("../models/product");
const User = require("../models/user");
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  (async () => {
    try {
      const products = await Product.fetchAll();
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
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
    });
  })();
};

exports.getIndex = (req, res, next) => {
  (async () => {
    try {
      const products = await Product.fetchAll();
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.getCart = async (req, res, next) => {
  try {
    const items = await req.user.getCart();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      items: items,
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
      const result = await req.user.addtoCart(product);
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
      const result = await req.user.deleteItemFromCart(prodId);
      res.redirect("/cart");
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.postOrder = async (req, res, next) => {
  try {
    const result = await req.user.addOrder();
    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders();
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
