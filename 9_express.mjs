import express from "express";
const app = express();
//  무조건 실행
app.use((req, res, next) => {
  res.setHeader("node-msg", "Hi node.js!");
  next();
});
// get 방식일 때만 (post X)
// next()  --> 실행 후 헤더를 만들고 나서 다음 함수를 찾아감
app.get("/", (req, res, next) => {
  res.send("<h2>익스프레스 서버로 만든 첫번쨰 페이지<h2>");
  next();
});
app.get("/hello", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ userid: "apple", name: "김사과", age: 20 });
  next();
});
app.listen(3000, () => {
  console.log("서버 실행중");
});