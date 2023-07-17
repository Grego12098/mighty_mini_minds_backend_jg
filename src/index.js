import app from "./app.js";
import {sequelize} from "./database/dbConection.js";
import {PORT} from "./config.js";
// for syncing models
//import {synchronizeModels} from "./database/dbConection.js";


async function main() { 
    try {
        await sequelize.sync({force: false});
         // create table and sync with db 
        // await synchronizeModels();
        console.log("Database connected");
        app.listen(PORT); 
        console.log(`example app listening at ${PORT}`) 
    } catch (error) {
        console.log(error);
    }
}

main();