import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `Mongo DB Connection Created at Host ${conn.connection.host}`.cyan
        .underline
    );
  } catch (error) {
    console.log(`Error Mesg : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
