const { User } = require("../../models/user");
const { Category } = require("../../models/category");
const { Post } = require("../../models/post");

module.exports = {
  Post: {
    author: async (parent, args, context, info) => {
      try {
        const userId = parent.author;
        const user = await User.findOne({ _id: userId });

        return {...user._doc, password: null}
      } catch (err) {
        throw err;
      }
    },
    category: async (parent, args, context, info) => {
      try {
        const categoryId = parent.category;
        const category = await Category.findById({ _id: categoryId });

        return { ...category._doc }
      } catch (err) {
        throw err;
      }
    },
  },
};
