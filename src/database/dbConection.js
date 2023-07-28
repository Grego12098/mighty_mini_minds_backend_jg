import  Sequelize  from "sequelize";
import {DB_URL} from "../config.js";

export const sequelize = new Sequelize( DB_URL,{
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false,
        }
    },
    define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

// function to create tables in db and sync them
//  export async function synchronizeModels() {
//         try {
//       await sequelize.sync();
//       console.log("Tables created successfully.");
//     } catch (error) {
//       console.error("Error creating tables:", error);
//     }
//   }