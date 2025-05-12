import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

const uploadDir = "uploads";
const thumbDir = path.join(uploadDir, "thumb");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir);

// 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 파일 이름 유추되지 않도록 설정하는 것이 좋음음
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  // 업로드 파일형식 지정
  const allowed = /jpeg|jpg|png|gif/;
  // 확장명 뽑아내기
  const ext = path.extname(file.originalname).toLowerCase();
  // 헤더로 넘어오면서 파일 형식을 알아낼 수 있음
  const mime = file.mimetype;
  // 정규 표현식 테스트
  if (allowed.test(ext) && allowed.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 업로드할 수 있습니다"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  // 용량 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 엔드 포인트
app.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "파일이 없습니다." });

  const { filename, path: filePath } = req.file;

  const baseName = path.parse(filename).name; // 파일 이름만 추출
  const thumbnailPngName = `thumb-${baseName}.png`;
  const thumbnailPath = path.join(thumbDir, thumbnailPngName);

  // 주소를 호출하면서 쿼리에 숫자를 보냈다면 그 숫자로 width와 height를 바꿔줌
  // 만약 데이터가 없다면 100으로 저장
  const width = parseInt(req.query.width) || 100;
  const height = parseInt(req.query.height) || 100;

  try {
    // 함수형 프로그래밍
    await sharp(filePath).resize(width, height).png().toFile(thumbnailPath);

    res.json({
      message: "업로드 및 PNG 썸네일 생성 성공",
      original: `/uploads/${filename}`,
      thumbnail: `/uploads/thumb/${thumbnailPngName}`,
      size: `${width}*${height}`,
    });
  } catch (err) {
    console.log("썸네일 생성 실패", err);
    res.status(500).json({ error: "썸네일 생성 실패" });
  }
});

app.listen(port, () => {
  console.log(`${port}번으로 서버 실행 중`);
});
