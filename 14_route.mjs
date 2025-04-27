import express from "express";

const app = express();

app
  .route("/posts")
  .get((req, res) => {
    res.status(200).send("/posts GET 호출");
  })
  .post((req, res) => {
    res.status(201).send("/post POST 호출");
  })
  .put((req, res) => {
    res.status(201).send("/post PUT 호출");
  })
  .delete((req, res) => {
    res.status(204).send("/post DELETE 호출");
  });

app.listen(3001, () => {
  console.log("서버 실행 중");
});
