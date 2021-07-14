import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { Database } from './app.database';
import { TestController } from './controllers/test.controller';
import { apiTestRouter } from './routers/test.routes';

export async function initApp() {
    /*-----Configuartion dotenv-----*/
    config({
        path: 'variable.env'
    });

    /*-----declaration app Exrepss-----*/
    const app = express();

    /*-----Middelwares et tools-----*/
    app.use(json()).use(cors());

    /*-----Routers-----*/
    app.use(apiTestRouter);

    /*-----Connection Database-----*/
    const initDatabase = async () => {
        const db = await Database.initDatabase();
        if (db) {
            /*initialize controller*/
            TestController.init();

            /*--------------*/
            app.listen(process.env.PORT, () => {
                console.log(
                    `Server is runing on http://localhost:${process.env.PORT}`
                );
            });
        } else {
            console.log('ERROR IN DATABASE');
        }
    };

    await initDatabase();
    return app;
}

// initApp();
