import express from "express";
import Post from "../models/postModel.js";
import { isAuth, isAdmin } from "../utils.js";
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

postRouter.get("/slug/:slug", async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
  });
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ message: "Post Not Found" });
  }
});
postRouter.get("/categories", async (req, res) => {
  const categories = await Post.find().distinct("category");
  res.send(categories);
});
postRouter.put("/:id", isAuth, isAdmin, async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (post) {
    post.title = req.body.title;
    post.slug = req.body.slug;
    post.image = req.body.image;
    post.category = req.body.category;
    post.content = req.body.content;
    await post.save();
    res.send({ message: "post Updated" });
  } else {
    res.status(404).send({ message: "post Not Found" });
  }
});
postRouter.post("/", isAuth, isAdmin, async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    slug: req.body.slug,
    image: req.body.image,
    category: req.body.category,
    content: req.body.content,
  });

  res.send(post);
});

postRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.send({ message: "Post Deleted" });
  } else {
    res.status(404).send({ message: "Post Not Found" });
  }
});
postRouter.get("/:chude", async (req, res) => {
  const posts = await Post.find({
    category: req.params.chude.split("=")[1].replace("+", " "),
  });
  if (posts) {
    res.send(posts);
  } else {
    res.status(404).send({ message: "Post Not Found" });
  }
});
postRouter.get("/:id", async (req, res) => {
  const posts = await Post.findById(req.params.id);
  res.send(posts);
});

export default postRouter;
