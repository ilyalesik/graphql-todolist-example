import regeneratorRuntime from "regenerator-runtime"
import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import cors from 'cors'

const URL = 'http://localhost';
const PORT = 3001;
const MONGO_URL = 'mongodb://localhost:27017/todolist';

const prepare = (o) => {
    if (o && o._id) {
        o._id = o._id.toString();
    }

    return o
}

export const start = async () => {
    try {
        const db = await MongoClient.connect(MONGO_URL)

        const TodoItems = db.collection('todoitems')

        const typeDefs = [`
      type Query {
        todoitems: [TodoItem]
      }

      type TodoItem {
        _id: String
        text: String
        deleted: Boolean
      }

      type Mutation {
        createTodoItem(text: String): TodoItem,
        markDeleted(_id: String): TodoItem
      }

      schema {
        query: Query
        mutation: Mutation
      }
    `];

        const resolvers = {
            Query: {
                todoitems: async () => {
                    return (await TodoItems.find({}).toArray()).map(prepare)
                },
            },
            TodoItem: {},
            Mutation: {
                createTodoItem: async (root, args, context, info) => {
                    const res = await TodoItems.insert(args);
                    return prepare(await TodoItems.findOne({_id: res.insertedIds[0]}))
                },
                markDeleted: async (root, {_id}) => {
                    await TodoItems.findOneAndUpdate({_id: ObjectId(_id)}, {$set: {deleted: true}});
                    return prepare(await TodoItems.findOne({_id: ObjectId(_id)}));
                }
            },
        };

        const schema = makeExecutableSchema({
            typeDefs,
            resolvers
        })

        const app = express()

        app.use(cors())

        app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))

        app.use('/graphiql', graphiqlExpress({
            endpointURL: '/graphql'
        }))

        app.listen(PORT, () => {
            console.log(`Visit ${URL}:${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }

}
