import {TodoItem} from './TodoItem'
import {Viewer} from './Viewer'
import {Token} from './Token'

const Query = `
  type Query {
    todoitems: [TodoItem]
    viewer(token: String): Viewer
  }
`;

const Mutation = `
  type Mutation {
     createTodoItem(text: String): TodoItem
     markDeleted(_id: String): TodoItem
     register(firstName: String!, lastName: String!, login: String!, password: String!): Token
}`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const typeDefs = [
    SchemaDefinition, Query, Mutation,
    TodoItem, Viewer, Token
];

export default typeDefs;