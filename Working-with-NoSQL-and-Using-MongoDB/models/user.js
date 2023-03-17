const mongodb = require("mongodb");
const { get } = require("../routes/admin");

const { getDb } = require("../util/database");

class User {
  constructor(id, username, email, cart) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.username = username;
    this.email = email;
    this.cart = cart ? cart : { items: [] };
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db.collection("users").updateOne(
        { _id: this._id },
        {
          $set: this,
        }
      );
    } else {
      return db.collection("users").insertOne(this);
    }
  }

  addtoCart(product) {
    const db = getDb();
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
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCard } });
  }

  async getCart() {
    const db = getDb();
    const prodIds = this.cart.items.map((item) => item.productId);
    const products = await db
      .collection("products")
      .find({ _id: { $in: prodIds } })
      .toArray();
    if (products.length !== prodIds.length) {
      const existingProductId = products.map((prod) => prod._id.toString());
      const filteredProdId = prodIds.filter((id) =>
        existingProductId.includes(id.toString())
      );
      const updatedCartItems = this.cart.items.filter((item) =>
        filteredProdId
          .map((id) => id.toString())
          .includes(item.productId.toString())
      );
      const result = await db
        .collection("users")
        .updateOne(
          { _id: this._id },
          { $set: { cart: { items: updatedCartItems } } }
        );
    }
    return products.map((prod) => {
      return {
        product: prod,
        quantity: this.cart.items.find(
          (item) => item.productId.toString() === prod._id.toString()
        ).quantity,
      };
    });
  }

  deleteItemFromCart(prodId) {
    const updateCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== prodId.toString()
    );
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: this._id },
        { $set: { cart: { items: updateCartItems } } }
      );
  }

  async addOrder() {
    const db = getDb();
    const items = await this.getCart();
    const order = {
      items: items,
      user: {
        _id: this._id,
        name: this.name,
      },
    };
    const result = await db.collection("orders").insertOne(order);
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
  }

  getOrders() {
    const db = getDb();
    return db.collection("orders").find({ "user._id": this._id }).toArray();
  }

  static findbyId(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = User;
