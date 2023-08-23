import { DataTypes } from "sequelize";
import { sequelize } from "../database/dbConection.js";
import {entries} from "./entryJournalModel.js";

export const users = sequelize.define("users", {
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
    },
    username:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    contact_email:{
        type: DataTypes.STRING,
    },
    contact_name:{
        type: DataTypes.STRING,
    },
    contact_relationship:{
        type: DataTypes.STRING,
    },
    avatar_url:{
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
       },
    updatedAt: {
        type: DataTypes.DATE,
    }
});

users.hasMany(entries, { foreignKey: 'user_uuid' });
entries.belongsTo(users, { foreignKey: 'user_uuid' });
