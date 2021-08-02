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
    req.headers.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA3OTM3NDRjYWZiMDM3NmUxZWI5MGMiLCJlbWFpbCI6ImtyaXB0b0B0ZXN0LmNvbSIsImlhdCI6MTYyNzkxMzkxMSwiZXhwIjoxNjI4NTE4NzExfQ.3rGHoMTU6mpR0SfWaxzom4jFLYtTZlal_JYfx4n9hPI";

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
