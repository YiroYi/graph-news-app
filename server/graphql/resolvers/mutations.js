const { User } = require("../../models/user");
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");

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
          _id:user._id,
          email: user.email,
          token: getToken.token
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
  },
};
