import express from "express";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
  fs.readFile("login.html", (err, data) => {
    if (err) {
      res.status(500);
      return res.send("파일 읽기 오류");
    }

    res.status(200).set({"Content-Type": "text/html"});
    res.send(data);
  });
});
app.get("/login", (req, res) => {
  console.log("login 호출!(GET)");
  console.log(req.query);
  console.log('아이디:',req.query.userid)
  console.log('비밀번호:',req.query.userpw)
});

app.listen(3001, () => {
  console.log("서버 실행중");
});
