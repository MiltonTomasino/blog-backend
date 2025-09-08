const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
}));
app.use(methodOverride("_method"));
app.use(cookieParser());

app.use("/blog", blogRouter);
app.use("/user", userRouter);

app.listen(3000, () => console.log("Listening on port 3000"));