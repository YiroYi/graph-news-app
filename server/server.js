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
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: ({ req }) => {
    req.headers.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA3OTM3NDRjYWZiMDM3NmUxZWI5MGMiLCJlbWFpbCI6Inlpcm9AdGVzdC5jb20iLCJpYXQiOjE2Mjc4ODY0NTIsImV4cCI6MTYyODQ5MTI1Mn0.zpzLdELHwOuiYFoFWmF_Ui5ZzfqFQWP1va65_St10oc";

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
