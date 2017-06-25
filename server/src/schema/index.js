import {TodoItem} from './TodoItem'

const Query = `
  type Query {
    todoitems: [TodoItem]
  }
`;

const Mutation = `
  type Mutation {
     createTodoItem(text: String): TodoItem,
     markDeleted(_id: String): TodoItem
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