import jwt from "jsonwebtoken";

const secretKey = "!@#$%^&*()";

// 1. 토큰 생성
const token = jwt.sign(
  // 페이로드에 객체 형식으로 넣음
  { userid: "apple", role: "admin" },
  // 시크릿 키
  secretKey,
  // 만료날짜
  { expiresIn: "1h" }
);
console.log("생성된 토큰:", token);

// 2. 토큰 검증
try {
  // 검증 메소드 : verify()
  const decoded = jwt.verify(token, secretKey);
  console.log("검증된 토큰 내용:", decoded);
} catch (error) {
  console.log("토큰 검증 실패", error.message);
}
