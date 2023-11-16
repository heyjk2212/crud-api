import express from "express";
import {
  getAllPosts1,
  createNewPost1,
  updatePost1,
  deletePostById1,
} from "../models/posts.js";

const router = express.Router();

// 게시글 작성 API
const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await createNewPost1(title, content);

    return res.status(200).json({ data: post });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ errorMessage: "서버에서 문제가 발생하였습니다" });
  }
};

// 게시글 전체 조회 API
const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPosts1();

    return res.status(200).json({ data: posts });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ errorMessage: "서버에서 문제가 발생하였습니다" });
  }
};

// 게시글 수정 API
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;

    const updatedPost = await updatePost1(postId, title, content);

    // 유저가 존재하지 않는 postId로 접근했을 때 에러메시지가 반환되지 않고 500번 서버에러로 뜬다. 이 부분 수정해야 한다.

    return res.status(200).json({ data: updatedPost });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ errorMessage: "서버에서 문제가 발생하였습니다" });
  }
};

// 게시글 삭제 API
const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    await deletePostById1(postId);

    // 유저가 존재하지 않는 postId로 접근했을 때 에러메시지가 반환되지 않고 500번 서버에러로 뜬다. 이 부분 수정해야 한다.

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ errorMessage: "서버에서 문제가 발생하였습니다" });
  }
};

router.post("/api/posts", createNewPost);
router.get("/api/posts", getAllPosts);
router.put("/api/posts/:postId", updatePost);
router.delete("/api/posts/:postId", deletePostById);

export default router;
