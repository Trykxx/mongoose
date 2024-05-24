import express from "express";
import { PostModel } from "../database/post.js";
import jsonwebtoken from "jsonwebtoken";

export const postsRouter = express.Router();

//! Etape 13: Back
postsRouter.post("/posts", async (req, res) => {
  const { title, description, content, imageUrl } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Titre et description obligatoires" });
  }

  const access_token = req.headers.authorization;
  if (!access_token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = access_token.split(" ")[1];
  const verifiedToken = jsonwebtoken.verify(token, SECRET_KEY);

  if (!verifiedToken) {
    return res.status(401).json({ error: "Token invalide !" });
  }

  const newPost = new PostModel({
    title,
    description,
    content,
    imageUrl,
    userID: verifiedToken.id
  });

  const post = await newPost.save();

  return res.json({
    post: {
      title: post.title,
      description: post.description,
      content: post.content,
      imageUrl:post.imageUrl,
      userID:post.userID
    },
  });
});
