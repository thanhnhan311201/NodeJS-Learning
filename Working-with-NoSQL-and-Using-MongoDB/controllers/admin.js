const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    null,
    title,
    price,
    imageUrl,
    description,
    req.user._id
  );
  console.log(req.user);
  (async () => {
    try {
      const result = await product.save();
      res.redirect("/admin/products");
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  (async () => {
    const product = await Product.findById(prodId);
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  })();
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const product = new Product(
    prodId,
    updatedTitle,
    updatedPrice,
    updatedImageUrl,
    updatedDesc,
    req.user._id
  );
  (async () => {
    try {
      const result = await product.save();
      res.redirect("/admin/products");
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.getProducts = (req, res, next) => {
  (async () => {
    const products = await Product.fetchAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  })();
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  (async () => {
    const result = await Product.deleteById(prodId);
    res.redirect("/admin/products");
  })();
};
