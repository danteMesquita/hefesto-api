import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import * as mongodb from 'mongodb';
import * as bodyParser from 'body-parser';

class App {
    public express: express.Application;
    public mongodb: mongodb.MongoClient;

    constructor(){
        this.mongodb = new mongodb.MongoClient("mongodb+srv://root:root@cluster0-6ltor.mongodb.net/test?retryWrites=true",
            {
                useNewUrlParser: true,
            }
        );
        
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));

        this.middleware();
    }

    private middleware(): void {
        // http://api.hefesto.com/
        this.express.get("/", (req, res)=>{
            res.send("Silence is golden")
        })

        // http://api.hefesto.com/graphql
        this.express.use("/graphql", graphqlHTTP({
            "schema" : schema,
            "graphiql" : process.env.NODE_ENV === 'development'
        }))

        
    }

}

export default new App().express;