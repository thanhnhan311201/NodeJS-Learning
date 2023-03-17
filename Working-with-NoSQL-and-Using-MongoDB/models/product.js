const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(id, title, price, imageUrl, description, userId) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db.collection("products").updateOne(
        { _id: this._id },
        {
          $set: this,
        }
      );
    } else {
      return db.collection("products").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray();
  }

  static findById(id) {
    const db = getDb();
    return db.collection("products").findOne({ _id: new mongodb.ObjectId(id) });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = Product;
