import App from './App';
import ItemController from './controllers/itemController';

const port: number = 3000;

const app = new App(
    [
        new ItemController(),
    ], port);

app.listen();
