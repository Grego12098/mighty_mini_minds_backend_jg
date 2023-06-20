import {config} from 'dotenv';

config();

export const PORT = process.env.PORT || 3000; // port to listen to the app

export const DB_URL = process.env.DB_URL; // url to connect to the db
