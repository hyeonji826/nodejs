const fs = require("fs");
// fs.readfi : 비동기
// fs.readfileSync : 동기  --> 별도로 오류(예외)처리해야함
// const data = fs.readFileSync("example.txt", "utf8");
// console.log("파일내용 : ", data);

fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.log("파일 읽기 실패 :", err);
    return;
  }
  console.log("파일 내용 :", data);
});
console.log('프로그램을 종요합니다.')
