import express from "express";
import { prisma } from "../utils/prisma/index.js";
// import { Posts } from "../models";

const router = express.Router();

// 게시글 작성 API
const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await prisma.posts.create({
      data: {
        title,
        content,
      },
    });

    return res.status(200).json({ data: post });
  } catch (error) {
    console.error(error);
  }
};

// 게시글 전체 조회 API
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      select: {
        postId: true,
        title: true,
        content: true,
      },
    });

    return res.status(200).json({ data: posts });
  } catch (error) {
    console.error(error);
  }
};

// 게시글 수정 API
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;

    const post = await prisma.posts.findFirst({
      where: {
        postId: +postId,
      },
    });

    if (!post) {
      return res
        .status(401)
        .json({ errorMessage: "존재하지 않는 포스트입니다." });
    }

    const updatedPost = await prisma.posts.update({
      where: {
        postId: +postId,
      },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json({ data: updatedPost });
  } catch (error) {
    console.error(error);
  }
};

// 게시글 삭제 API
const deletePostById = async (req, res) => {
  const { postId } = req.params;

  const post = await prisma.posts.findFirst({
    where: {
      postId: +postId,
    },
  });

  if (!post) {
    return res
      .status(401)
      .json({ errorMessage: "삭제하려는 포스트가 존재하지 않습니다." });
  }

  await prisma.posts.delete({
    where: {
      postId: +postId,
    },
  });

  return res.status(200).json({ message: "success" });
};

router.post("/api/posts", createNewPost);
router.get("/api/posts", getAllPosts);
router.put("/api/posts/:postId", updatePost);
router.delete("/api/posts/:postId", deletePostById);

export default router;
