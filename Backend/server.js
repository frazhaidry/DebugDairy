const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const commentRoutes = require('./routes/comment.routes');
const postRouter = require("./routes/post.routes");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use('/api', commentRoutes);
app.use("/api/posts", postRouter);


app.get("/", (req,res) => {
    res.send("Hello from backend");
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});