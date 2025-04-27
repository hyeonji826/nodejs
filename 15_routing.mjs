import express from "express";
import userRouter from "./routes/user.mjs";
import userPost from "./routes/post.mjs";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/post", userPost);

app.listen(3001, () => {
  console.log("서버 실행 중");
});
