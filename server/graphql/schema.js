const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    isAuth: User!
    post(id: ID!): Post!
    posts(sort: SortInput, queryBy: QueryByInput): [Post!]!
    categories(catId: ID): [Category!]!
  }

  type Mutation {
    updateEmailPass(email: String!, password: String, _id: ID!): User!
    updateUserProfile(name: String, lastname: String, _id: ID!): User!
    authUser(fields: AuthInput!): User!
    signUp(fields: AuthInput!): User!
    createPost(fields: PostInput!): Post!
    updatePost(fields: PostInput!, postId:ID!): Post!
    deletePost(postId:ID!): Post
    createCategory(name: String!): Category!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    name: String
    lastname: String
    token: String
    posts(sort: SortInput): [Post!]!
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
    related(sort: SortInput): [Post!]!
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

  input SortInput {
    sortBy: String
    order: String
    limit: Int
    skip: Int
  }

  input QueryByInput {
    key: String!
    value: String
  }
`;

module.exports = typeDefs;
