import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import jwt, {decode} from "jsonwebtoken";
import imageRoute from "./routes/image_route.js";
import userRoute from "./routes/user_route.js";
import foodRoute from "./routes/food_route.js";
import getUser from "./routes/getuser.js";
import getFood from "./routes/get_food.js";
import commentRoute from "./routes/comment_route.js";
import protectUser from "./middleware/protect.js";
import updateProfile from "./routes/update_route.js";
import favouriteFood from "./routes/favourite_route.js";

const port = process.env.PORT || 8000;

const server = express();

server.use(cors());
server.use(express.json()); // middleware   to use json
// Global catches
// Error handling middleware

server.use((error, req, res, next) => {
  res.status(500).send({
    message: "An Internal server error occured !",
  });
});

// Connect db

mongoose
  .connect(process.env.MONGODB, {
    autoIndex: true, // enable autoindexing
  })
  .then(() => console.log("Connected"))
  .catch((e) => {
    console.log(e);
  });

// Routes
server.use("/api/image", imageRoute);
server.use("/api/user", userRoute);
server.use("/api/getuser", protectUser, getUser);
server.use("/api/food", protectUser, foodRoute);
server.use("/api/user/update", protectUser, updateProfile);
server.use("/api/favourite", protectUser, favouriteFood);
server.use("/api/getfood", getFood);
server.use("/api/comment", commentRoute);

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
