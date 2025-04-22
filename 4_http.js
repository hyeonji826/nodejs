const http = require("http");
const server = http.createServer((req, res) => {
    const url = req.url
    //
    if (url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Home_page");
      } else if (url === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Introduce_Page");
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Cant find page");
      }
    });


  // 헤더에 적을 데이터 --> 브라우저에 보내줌
  // 400 이상은 page 오류
  // 200~ 정상 호출
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello, World!\n");
// });

// 127.0.0.1, localhost
server.listen(3000, () => {
  console.log("서버 실행 중");
});
// localhost:3000