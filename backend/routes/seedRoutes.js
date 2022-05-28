import express from 'express';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import UncheckPost from '../models/uncheckPostModel.js';
import data from '../data.js';


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // await Post.remove({});
  // const createdPosts = await Post.insertMany(data.posts);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  // await  UncheckPost.remove({});
  // const createdPosts = await UncheckPost.insertMany(data.uncheckposts);
  res.send({ createdUsers });
});
export default seedRouter;