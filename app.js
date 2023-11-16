import express from "express";
import PostsRouter from "./src/routes/posts.router.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("test");
});

app.use(PostsRouter);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`);
});
