const fs = require("fs");

fs.writeFileSync("output.txt", "이 내용이 파일에 저장됩니다.");
console.log("파일 저장 완료!(동기)");


fs.writeFile("output2.txt", "비동기 방식으로 저장합니다.", (err) => {
  if (err) {
    console.error("저장실패 :", err);
    return;
  }
  console.log("파일 저장 완료(비동기)");
});


fs.appendFile("output2.txt", "\n새로운 줄이 추가됩니다.", (err) => {
  if (err) throw err;
  console.log("내용 추가 완료!");
});

fs.unlink("output2.txt", (err) => {
  if (err) throw err;
  console.log("파일 삭제 완료");
});

