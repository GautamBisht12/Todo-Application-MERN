import cookieParser from "cookie-parser";
import app from "./app";
import connectDb from "./db/connectDb";

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
connectDb().then(() => {
  app.listen(PORT!, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
