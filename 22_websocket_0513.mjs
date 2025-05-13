/*
서버를 만들때 서버 소켓이라는 것을 만든다. 그럼 클라이언트(사용자)가 ip/port를 통해서 서버와 접속을 한다, 유저 또한 소켓(통신을 위한 것)이 만들어지고, 서버또한 소켓을 만들어 연결시켜준다.

    웹소켓
    웹소켓은 웹 브라우저와 서버 사이에 지속적으로 연결을 유지하면서 실시간으로 데이터를 주고받을 수 있는 통신 방식

예를 들어 가만히 있어도 상대방의 쳇이 올라오는 것
server.mjs만들고 html socket으로 서버 접속 서버는 악수로 소켓을 만들고 연결
*/
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const app = express();
const server = createServer(app);
const io = new Server(server);
// ES(.mjs)에서는 __dirname, __filename이 없음
// import.meta.url: 현재 파일 경로
// fileURLToPath: 실제 경로를 문자열로 변환
// path.dirname: 디렉토리 이름만 추출
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

//사용자 정보 저장
const users = {};
const channels = ["lobby", "sports", "programming", "music"];

// 사용자가 접속 -> 클라이언트 소켓 이벤트 생성
io.on("connection", (socket) => {
  socket.on("join", ({ nickname, channel }) => {
    // nickname 생성
    socket.nickname = nickname;
    socket.channel = channel;
    users[socket.id] = { nickname, channel };
    // 개별적인 소켓이 그룹으로 뭉쳐짐 단, 이름이 같은 것들끼리 뭉쳐짐
    socket.join(channel);

    const msg = { user: "system", text: `${nickname}님이 입장했습니다.` };
    // 서버소켓이 채널을 넣어 클라이언트 쪽으로 이벤트 전송
    io.to(channel).emit("message", msg);
    // msg처리 --> chat.html로 이동
    console.log("nickname:", nickname, "channel:", channel);

    updateUserList();
  });
  socket.on("chat", ({ text, to }) => {
    const sender = users[socket.id];
    if (!sender) return;
    const payload = { user: sender.nickname, text };

    // 귓속말 처리
    // [0] -->  소켓id
    // ?.(옵셔널 체이닝) --> 값이 undefined일 경우 에러 없이 넘어가게 함 (사용자(=id)가 없을 수도 있으니 안전하게 접근)
    if (to) {
      const receiverSocket = Object.entries(users).find(
        ([id, u]) => u.nickname === to
      )?.[0];
      if (receiverSocket) {
        // 상대에게 전송
        io.to(receiverSocket).emit("whisper", payload);
        // 나한테도 보이게
        socket.emit("whisper", payload)
      }
    } else {
      io.to(sender.channel).emit("message", payload); // 전체전송
    }
  });
  // 사용자 퇴장
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const msg = {
        user: "system",
        text: `${user.nickname}님이 퇴장했습니다.`,
      };
      io.to(user.channel).emit("message", msg);
      delete users[socket.id];

      updateUserList();
    }
  });
  function updateUserList() {
    // users에 닉네임,채널이 객체로 들어가있음 메모리에
    // 배열을 만들어 재대입
    const userList = Object.values(users);
    io.emit("userList", userList);
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
