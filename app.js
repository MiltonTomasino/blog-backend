const express = require("express");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");
const app = express();

app.use(express.json());

app.use("/blog", blogRouter);
app.use("/user", userRouter);

app.listen(3000, () => console.log("Listening on port 3000"));