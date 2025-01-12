import express from "express";
import userRouter from "./src/routes/user.routes.js";
import postRouter from "./src/routes/post.routes.js";
import likeRouter from "./src/routes/like.routes.js";
import commentRouter from "./src/routes/comment.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route defined
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/comment", commentRouter);

export default app;
