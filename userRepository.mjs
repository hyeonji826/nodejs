import { db } from "./db.mjs";

export async function getUsers() {
  // db.query("select * from member")의 반환은 [rows,fields]
  const [rows] = await db.query("select * from member");
  //   console.log(rows);
  return rows;
}

// insert
export async function createUser(
  userid,
  userpw,
  name,
  hp,
  email,
  gender,
  ssn1,
  ssn2,
  zipcode,
  address1,
  address2,
  address3
) {
  const [result] = await db.query(
    "insert into member (userid,userpw,name,hp,email,gender,ssn1,ssn2,zipcode,address1,address2,address3) values(?,?,?,?,?,?,?,?,?,?,?,?) ",
    [
      userid,
      userpw,
      name,
      hp,
      email,
      gender,
      ssn1,
      ssn2,
      zipcode,
      address1,
      address2,
      address3,
    ]
  );
  return result.insertId;
}

// update
export async function updateUserEmail(idx, newEmail) {
  const [result] = await db.query(
    // 입력받을 곳은 ?로 처리
    "update member set email=? whwere idx=?",
    [newEmail, idx]
  );
  return result.affectedRows; // 몇 개의 행이 수정됐는지 알 수 있음.ㄴ
}

// delete
export async function deleteUser(idx) {
  const [result] = await db.query("delete from member where idx=?", [idx]);
  return result.affectedRows;
}
