require("dotenv").config();

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongoDb;

const connectMongoDb = async () => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.caidtma.mongodb.net/shop?retryWrites=true&w=majority`
    );
    mongoDb = client.db("shop");
  } catch (err) {
    console.log(err);
  }
};

const getDb = () => {
  if (mongoDb) {
    return mongoDb;
  }
  throw "No database found!";
};

exports.connectMongoDb = connectMongoDb;
exports.getDb = getDb;
