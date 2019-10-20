const { gql } = require("apollo-server-express");

/**
 *  @TODO: Boomtown Schema
 * We will create the custom Date scalar together.
 */
module.exports = gql`
  # scalar Date 

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]
    created: String!
    borrower: User
  }

  type User {
    id: ID!
    email:String!
    fullname: String!
    password: String!
    bio: String
    items:[Item]
    borrowed:[Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]!
  }

  type Query {
    viewer: User
    user(id: ID!): User
    users: [User]
    tags: [Tag]
    items(filter: ID): [Item]
  }

  type Mutation {
    signup: Boolean
    login: Boolean
    logout: Boolean
    addItem(item: NewItemInput!): Item
  }
`;