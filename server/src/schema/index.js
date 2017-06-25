import {TodoItem} from './TodoItem'
import {Viewer} from './Viewer'

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
     register(firstName: String, lastName: String, login: String, password: String): {
        token: String
        error: String
     }
}`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const typeDefs = [
    SchemaDefinition, Query, Mutation,
    TodoItem
];

export default typeDefs;