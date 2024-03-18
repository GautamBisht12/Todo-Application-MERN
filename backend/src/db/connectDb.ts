import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const URI = process.env.MONGO_URI;
    await mongoose.connect(URI!).then(() => {
      console.log("Mongo Db Connected");
    });
  } catch (error) {
    console.log(`Error while connecting to database ${error}`);
  }
};

export default connectDb;
