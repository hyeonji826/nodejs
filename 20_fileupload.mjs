import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 3000;

// 설정정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 파일 저장할 폴더 생성
    const uploadPath = "uploads/";
    // root에 업로드 파일 생성
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    // null은 에러객체이다.
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // 현재 날짜와 랜덤 숫자
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// multer의 파일 하나를 single 메소드에 받는다. (file명은 프론트의 name)
app.post("/upload-single", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.json({
    message: "단일 파일 업로드 성공",
    file: req.file,
  });
});

app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  console.log(req.files);
  res.json({
    message: "다중 파일 업로드 성공",
    files: req.files,
  });
});

app.listen(port, () => {
  console.log(`${port}번으로 서버 실행 중`);
});
