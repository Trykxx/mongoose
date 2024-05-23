import express from "express";
import { PostModel } from "../database/post.js";

export const postsRouter = express.Router();

//! Etape 13: Back
postsRouter.post("/posts", async (req,res)=>{
const { title, description, content, imageUrl } = req.body;

  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Content:", content);
  console.log("Image URL:", imageUrl);
})