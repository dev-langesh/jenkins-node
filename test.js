const assert = require("assert");

const axios = require("axios");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

describe("Request", () => {
  it("Response should have message", async () => {
    const req = await axios.get(`http://localhost:${PORT}`);

    const data = req.data;

    assert.strictEqual(req.data.message, "hello");
  });
});
