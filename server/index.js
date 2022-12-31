import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { Novu } = require("@novu/node");
const novu = new Novu("f7fe9e0e5e162b8d832f276d21aa1729");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from server!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
