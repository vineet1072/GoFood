const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected!");
    const fetched_data = mongoose.connection.db.collection("food_items");
    const category_data = mongoose.connection.db.collection("food_category");
    const data = await fetched_data.find({}).toArray();
    const categoryData = await category_data.find({}).toArray();
    global.food_items = data;
    global.food_category = categoryData;
  } catch (error) {
    console.log("err: ", error);
  }
};

module.exports = connectDb;
