const { Post } = require("../../models/post");
const { User } = require("../../models/user");

module.exports = {
  Category: {
    posts: async (parent, args, context, info) => {
      try {
        const categoryId = parent._id;
        const posts = await Post.find({ category: categoryId });

        return posts;
      } catch (err) {
        throw err;
      }
    },
    author: async (parent, args, context, info) => {
      try {
        const authorId = parent.author;
        const author = await User.findOne({ _id: authorId });

        return { ...author._doc, password: null };
      } catch (err) {
        throw err;
      }
    },
  },
};
