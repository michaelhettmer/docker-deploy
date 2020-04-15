import express from 'express';
import { Server as HttpServer } from 'http';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { serverPort } from './config';
import router from './router';

const whitelist = ['http://localhost:3000', 'http://localhost:8000'];

export const CorsWhitelist: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(CorsWhitelist));
app.use(router);

const server = new HttpServer(app);
server.listen(serverPort, () => {
    console.log('### Server listening on *:' + serverPort);
});
