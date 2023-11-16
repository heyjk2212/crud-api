import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // Prisma를 이용해 데이터베이스를 접근할 때, SQL을 출력해줍니다.
  log: ["query", "info", "warn", "error"],

  // 에러 메시지를 평문이 아닌, 개발자가 읽기 쉬운 형태로 출력해줍니다.
  errorFormat: "pretty",
});

const getAllPosts1 = async (title, content, postId) => {
  return await prisma.posts.findMany({
    select: {
      postId: true,
      title: true,
      content: true,
    },
  });
};

const createNewPost1 = async (title, content) => {
  return await prisma.posts.create({
    data: {
      title,
      content,
    },
  });
};

const updatePost1 = async (postId, title, content) => {
  return await prisma.posts.update({
    where: {
      postId: +postId,
    },
    data: {
      title,
      content,
    },
  });
};

const deletePostById1 = async (postId) => {
  const post = await prisma.posts.findFirst({
    where: {
      postId: +postId,
    },
  });

  await prisma.posts.delete({
    where: {
      postId: +postId,
    },
  });
};

export { getAllPosts1, createNewPost1, updatePost1, deletePostById1 };
