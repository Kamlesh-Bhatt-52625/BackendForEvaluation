const { Router } = require("express");
const { UserModel } = require("../models/User.model");
const { BlogModel } = require("../models/Blog.model");
require("dotenv").config();

const BlogRouter = Router();

BlogRouter.get("/", async (req, res) => {
  let object = {};
  if (req.query.category) {
    object.category = req.query.category;
  }
  if (req.query.author) {
    object.author = req.query.author;
  }
  if (req.query.title) {
    object.title = req.query.title;
  }
  if (req.query.content) {
    object.content = req.query.content;
  }

  const blog = await BlogModel.find(object);

  res.send({ message: "Requested Blogs", blog });
});

BlogRouter.post("/create", async (req, res) => {
  const { title, category, author, content, image } = req.body;
  //   console.log(title, category, author, content, image);
  const userId = req.userId;
  //   console.log(userId);

  const validUser = await UserModel.findOne({ _id: userId });

  const createdBlog = new BlogModel({
    title,
    category,
    author,
    content,
    image,
  });

  await createdBlog.save();
  res.send("Blog has been created successfully");
});

BlogRouter.put("/update/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const payload = req.body;
  const userId = req.userId;
  const validUser = await UserModel.findOne({ _id: userId });
  const validBlog = await BlogModel.findOne({ _id: blogId });
  console.log(validUser);
  res.send("hi");
});


module.exports = { BlogRouter };
