import bcrypt from "bcrypt";

const password = "apple1004"; // 사용자가 입력한 비밀번호
const saltRounds = 10; // 연산 반복 횟수 (10~12 추천)

// 1. 비밀번호 해시화 (저장할 때)
async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log("해시된 비밀번호:", hashed);
  return hashed;
}

// 2. 비밀번호 검증 (로그인할 때)
async function verifyPassword(inputPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  console.log("비밀번호 일치 여부:", isMatch);
  return isMatch;
}

// 사용 예시
async function runExample() {
  const hashed = await hashPassword(password); // 비밀번호 암호화

  await verifyPassword("apple1004", hashed); // 비밀번호 맞음 → true
  await verifyPassword("apple8282", hashed); // 비밀번호 틀림 → false
}

runExample();