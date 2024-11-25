const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const URI = process.env.MONGODB_URI;

    if (!URI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }

    // Connect to the database
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");

    // Access collections
    const fetched_data = mongoose.connection.db.collection("food_items");
    const category_data = mongoose.connection.db.collection("food_category");

    // Fetch data
    const data = await fetched_data.find({}).toArray();
    const categoryData = await category_data.find({}).toArray();

    // Assign to global variables
    global.food_items = data;
    global.food_category = categoryData;

    console.log("Global data initialized successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDb;
