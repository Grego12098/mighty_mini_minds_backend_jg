import app from "./app.js";
import {sequelize} from "./database/dbConection.js";
import {PORT} from "./config.js";
// import function used on line 9  
// import {synchronizeModels} from "./database/dbConection.js";

// runs app and syncs db
async function main() { // async function to use await db connection and sync
    try {
        await sequelize.sync({force: false});
         // create table and sync with db 
        // await synchronizeModels();
        console.log("Database connected");
        app.listen(PORT); // listen to the app on port 3000
        console.log(`example app listening at ${PORT}`) // log to console
    } catch (error) {
        console.log(error);
        
    }
}

main();