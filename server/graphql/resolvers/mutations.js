const { User } = require("../../models/user");
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");
const authorize = require("../../utils/isAuth");
const { userOwnership } = require("../../utils/tools");
module.exports = {
  Mutation: {
    authUser: async (parent, args, context, info) => {
      try {
        const user = await User.findOne({
          email: args.fields.email,
        });

        if (!user) {
          throw new AuthenticationError("Invalid email");
        }

        const checkpass = await user.comparePassword(args.fields.password);

        if (!checkpass) {
          throw new AuthenticationError("Invalid password");
        }

        const getToken = await user.generateToken();

        if (!getToken) {
          throw new AuthenticationError("Something went wrong, try again");
        }

        return {
          _id: user._id,
          email: user.email,
          token: getToken.token,
        };
      } catch (err) {
        if (err.code == 11000) {
          throw new AuthenticationError(
            "Sorry duplicated email, try a new one"
          );
        }
      }
    },
    signUp: async (parent, args, context, info) => {
      try {
        const user = new User({
          email: args.fields.email,
          password: args.fields.password,
        });

        const getToken = await user.generateToken();

        if (!getToken) {
          throw new AuthenticationError("Something went wrong, try again");
        }

        return { ...getToken._doc };
      } catch (err) {
        if (err.code == 11000) {
          throw new AuthenticationError(
            "Sorry duplicated email, try a new one"
          );
        }
      }
    },
    updateUserProfile: async (parents, args, context, info) => {
      try {
        const req = authorize(context.req);

        if (!userOwnership(req, args._id))
          throw new AuthenticationError("You dont own this user");

        const user = await User.findOneAndUpdate(
          {
            _id: args._id,
          },
          {
            $set: {
              name: args.name,
              lastname: args.lastname,
            },
          },
          {
            new: true,
          }
        );

        return { ...user._doc };
      } catch (err) {}
    },
    updateEmailPass: async (parents, args, context, info) => {
      try {
        const req = authorize(context.req);

        if (!userOwnership(req, args._id))
          throw new AuthenticationError("You dont own this user");

        const user = await User.findOne({ _id: req._id });

        if (!user) throw new AuthenticationError("Sorry Try again");

        if (args.email) {
          user.email = args.email;
        }
        if (args.password) {
          user.password = args.password;
        }

        const getToken = await user.generateToken();
       
        if (!getToken) {
          throw new AuthenticationError("Something went wrong, try againx");
        }

        return { ...getToken._doc, token: getToken.token };
      } catch (err) {
        throw new ApolloError("Something went wrong, try again", err);
      }
    },
  },
};
