const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  (async () => {
    try {
      const products = await Product.findAll();
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
    const product = await Product.findByPk(prodId);
    // const [product] = await Product.findAll({ where: { id: prodId } });
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
      const products = await Product.findAll();
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

exports.getCart = (req, res, next) => {
  (async () => {
    try {
      const cart = await req.user.getCart();
      const products = await cart.getProducts();
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.postCart = (req, res, next) => {
  (async () => {
    try {
      const prodId = req.body.productId;
      const cart = await req.user.getCart();
      const [existingProduct] = await cart.getProducts({
        where: { id: prodId },
      });
      if (existingProduct) {
        await cart.addProduct(existingProduct, {
          through: { quantity: existingProduct.cartItem.quantity + 1 },
        });
      } else {
        const product = await Product.findByPk(prodId);
        await cart.addProduct(product, { through: { quantity: 1 } });
      }
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
      const cart = await req.user.getCart();
      const [existingProduct] = await cart.getProducts({
        where: { id: prodId },
      });
      if (existingProduct) {
        existingProduct.cartItem.destroy();
      }
      res.redirect("/cart");
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.postOrder = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();
    await products.forEach(
      async (product) =>
        await order.addProduct(product, {
          through: { quantity: product.cartItem.quantity },
        })
    );
    await cart.setProducts(null);
    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({ include: "products" });
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
