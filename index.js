const express = require("express");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "hello", name: "langesh" });
});

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
