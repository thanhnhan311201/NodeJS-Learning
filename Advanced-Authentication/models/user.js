const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const existingProductIndex = this.cart.items.findIndex((item) => {
    return item.productId.toString() === product._id.toString();
  });
  let updatedCard = this.cart;
  if (existingProductIndex >= 0) {
    updatedCard.items[existingProductIndex].quantity =
      this.cart.items[existingProductIndex].quantity + 1;
  } else {
    updatedCard.items.push({ productId: product._id, quantity: 1 });
  }
  this.cart = updatedCard;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updateCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );
  this.cart.items = updateCartItems;
  return this.save();
};

userSchema.methods.cleanCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
