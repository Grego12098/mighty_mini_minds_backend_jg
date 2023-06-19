import { DataTypes } from "sequelize";
import { sequelize } from "../database/dbConection.js";
import {entryJournal} from "./entryJournalModel.js";

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
    contactEmail:{
        type: DataTypes.STRING,
    },
    contactName:{
        type: DataTypes.STRING,
    },
    contactRelationship:{
        type: DataTypes.STRING,
    },
    avatarUrl:{
        type: DataTypes.STRING,
    }
});

users.hasMany(entryJournal,{
    foreignKey: "userUuid", 
    sourceKey: "uuid"
});

entryJournal.belongsTo(users,{
    foreignKey: "userUuid",
    sourceKey: "uuid"
});