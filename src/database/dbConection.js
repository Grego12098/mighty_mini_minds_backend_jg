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
    }
});

export async function synchronizeModels() {
    try {
      await sequelize.sync();
      console.log("Tables created successfully.");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  }