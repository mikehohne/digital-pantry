import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

class App {
    public app: express.Application;
    public mongoose: any;

    constructor(controllers: any[], public port: number) {
        this.app = express();
        this.mongoose = mongoose;
        this.mongoose.promise = global.Promise;
        this.configureDB();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on Port ${this.port}`);
        });
    }

    private initializeControllers(controllers: any[]): void {
        controllers.forEach((controller: any) => {
            this.app.use('/api', controller.router);
        });
    }

    private configureDB(): void {
        this.mongoose.connect('mongodb://localhost/pantry', { useNewUrlParser: true });
        this.mongoose.set('useFindAndModify', false);
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }
}

export default App;
