const express = require("express");
const path = require("path");
const app = express();
const port = 3001;

// post 데이터 받는방법
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"))   // 실제 폴더 이름
app.use("/static", express.static("public"));   // static URL 접근, public 실제폴더

app.set("view engine", "ejs");
// 파일경로를 views라고 통합하여 칭한다.
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("<h2>홈페이지입니다. 다양한 기능을 테스트해보세요.</h2>");
});

// http://localhost:3001/user 에 id값 보내기
app.get("/user/:id", (req, res) => {
  res.send(`요청한 사용자 ID는 ${req.params.id}입니다.`);
});

app.get("/search", (req, res) => {
  const { keyword, number } = req.query;
  res.send(`검색어: ${keyword} 번호 :${number}`);
});

app.post("/submit", (req, res) => {
  const { name, age } = req.body;
  res.send(`이름 : ${name}, 나이 : ${age}`);
});

app.get("/hello", (req, res) => {
  res.render("hello", { name: "김사과" });
});

app.get("/posts", (req, res) => {
  const posts = [
    { title: "첫 번째 글", content: "내용입니다." },
    { title: "두 번째 글", content: "Express는 정말 어려워요~" },
  ];
  res.render("posts", { posts });
});

app.listen(port, () => {
  console.log("서버 실행중");
});
