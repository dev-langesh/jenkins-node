const express = require("express");

const app = express();

require("dotenv").config();

const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "hello" });
});

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
