const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const db = process.env.DB_URL;

////// graphQL definitions
const typeDefs = require("./graphql/schema");
const { Query } = require("./graphql/resolvers/query");
const { Mutation } = require("./graphql/resolvers/mutations");
const { User } = require("./graphql/resolvers/user");
const { Post } = require("./graphql/resolvers/post");
const { Category } = require("./graphql/resolvers/category");
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Category,
  },
  context: ({ req }) => {

    return { req };
  },
});

server.applyMiddleware({ app });
const PORT = process.env.PORT || 5000;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
