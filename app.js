import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("teacher-browser 백앤드 서버입니다.");
});

app.listen(process.env.PORT || 3000);
