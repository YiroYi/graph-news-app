const { User } = require("../../models/user");
const { Category } = require("../../models/category");
const authorize = require("../../utils/isAuth");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Query: {
    user: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);

        const user = await User.findOne({ _id: args.id });

        if (req._id.toString() !== user._id.toString()) {
          throw new AuthenticationError("YOU DONT OWN THIS USER");
        }

        return user;
      } catch (err) {
        throw err;
      }
    },
    isAuth: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req, true);

        if(!req._id) {
          throw new AuthenticationError('Bad token');
        }

        return { _id: req._id, email: req.email, token: req.token };
      } catch (err) {
        throw err;
      }
    },
    categories: async(parent, args, context, info) => {
      try {
        const categories = await Category.find({_id: args.catId});

        return categories; 
      } catch(err) { 
        throw err;
       }
    }
  },
};
