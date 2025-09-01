const express = require("express");
const router = require("./routes/blog");
const app = express();

app.use(express.json());

app.use("/", router);

app.listen(3000, () => console.log("Listening on port 3000"));