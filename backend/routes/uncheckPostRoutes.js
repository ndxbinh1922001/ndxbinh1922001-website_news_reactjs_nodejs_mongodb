import express from "express";
import UncheckPost from "../models/uncheckPostModel.js";
import { isAuth, isAdmin } from "../utils.js";
const unchecPostRouter = express.Router();

unchecPostRouter.get("/", async (req, res) => {
  const posts = await UncheckPost.find();
  res.send(posts);
});
unchecPostRouter.post("/", isAuth, async (req, res) => {
  const newPost = await UncheckPost.insertMany(
    [
      {
        title: req.body.title,
        slug: req.body.slug,
        image: req.body.image,
        category: req.body.category,
        content: req.body.content,
      },
    ],
    function (err) {
      if (err) throw err;
    }
  );
  res.send("oke");
});
unchecPostRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  async (req, res) => {
    const post = await UncheckPost.findById(req.params.id);
    if (post) {
      await post.remove();
      res.send({ message: "Post Deleted" });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  }
);
export default unchecPostRouter;
