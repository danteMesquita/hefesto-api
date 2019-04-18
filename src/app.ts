import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import schema from './util/graphql/schema';
import * as mongodb from 'mongodb';

class App {
    public express: express.Application;
    public mongodb: mongodb.MongoClient

    constructor(){
        this.mongodb = new mongodb.MongoClient("mongodb+srv://root:root@cluster0-6ltor.mongodb.net/test?retryWrites=true",
            {
                useNewUrlParser: true,
            }
        );
        this.express = express();
        this.middleware();
    }

    private middleware(): void {
        this.express.use("/graphql", graphqlHTTP({
            "schema" : schema,
            "graphiql" : process.env.NODE_ENV === 'development'
        }))
    }

}

export default new App().express;