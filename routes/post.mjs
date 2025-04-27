import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("post에 존재하는 미들웨어");
  next();
});

//  /users/
router.get("/", (req, res) => {
    res.status(200).send("GET: /post 글보기");
});
router.post("/", (req, res) => {
  res.status(201).send("POST /post 글 작성하기");
});
router.put("/:id", (req, res) => {
  res.status(201).send("PUT /post:id 글 수정하기");
});
router.delete("/:id", (req, res) => {
  res.status(201).send("DELETE /post:id 글 삭제하기");
});

export default router;
