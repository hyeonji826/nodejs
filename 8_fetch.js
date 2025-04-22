const http = require("http");

const skills = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "Java" },
  { name: "Python" },
  { name: "Node.js" },
  { name: "AI" },
  { name: "MySQL" },
  { name: "mongoDB" },
];

const server = http.createServer((req, res) => {
  // CORS(브라우저가 blocking하는 것)를 방지하기 위해 쓰는 코드들
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   url은 무조건 'GET'방식
  const url = req.url;
  const method = req.method;
  if (method == "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(skills));
  }
});

server.listen(3001, () => {
  console.log("서버 실행 중");
});
