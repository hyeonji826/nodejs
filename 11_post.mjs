import express from "express";

const app = express();
// 뭔가 실행하고 넘어가야하는 것들
app.use(express.urlencoded({ extended: true }));    // post 요청용

app.post("/login", (req, res) => {
  const { userid, userpw } = req.body;
  console.log("아이디 :",userid);
  console.log('비밀번호:',userpw);
  res.send(`아이디 : ${userid}, 비밀번호 : ${userpw}`);
});

app.listen(3001, () => {
  console.log("서버 실행중");
});
