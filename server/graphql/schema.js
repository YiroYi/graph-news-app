const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    isAuth: User!
  }

  type Mutation {
    updateEmailPass(email: String!, password: String, _id: ID!): User!
    updateUserProfile(name: String, lastname: String, _id: ID!): User!
    authUser(fields: AuthInput!): User!
    signUp(fields: AuthInput!): User!
    createPost(fields: PostInput!): Post!
    createCategory(name: String!): Category!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    name: String
    lastname: String
    token: String
    posts: [Post!]!
    categories: [Category!]!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Post {
    _id: ID!
    title: String!
    excerpt: String!
    content: String!
    status: PostStatus
    created_at: String!
    updated_at: String!
    category: Category
    author: User!
  }

  input PostInput {
    title: String
    excerpt: String
    content: String
    status: PostStatus
    category: ID
  }

  enum PostStatus {
    PUBLIC
    DRAFT
  }

  type Category {
    _id: ID!
    name: String!
    author: User!
    posts: [Post]
  }
`;

module.exports = typeDefs;
