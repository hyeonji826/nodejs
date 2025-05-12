import { createUser, deleteUser, getUsers, updateUserEmail } from "./userRepository.mjs";
import { db } from "./db.mjs";

async function main() {
  //    select
  //   const users = await getUsers();
  //   console.log("사용자 목록:", users);

  //     insert
  //  userid,userpw,name,hp,email,gender,ssn1,ssn2,zipcode,address1,address2,address3
  /*
  const newUserId = await createUser(
    "hyeonji",
    "1011",
    "현지",
    "010-1111-1111",
    "hyeonji@naver.com",
    "남자",
    "000000",
    "0000000",
    "12345",
    "서울 서초구 양재동",
    "11-11",
    "6층"
  );
  console.log("새 사용자 ID", newUserId);*/

  //   update
  const updateCount = await updateUserEmail(1, "apple@naver.com");
  console.log("수정된 사용자 수 :", updateCount);

  //  pool 끊어버리기 (잘 사용안함)
  await db.end();

  // delete
const deleteCount = await deleteUser(6);
console.log("삭제된 사용자 수: ",deleteCount)
}

main();
