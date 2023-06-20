import { DataTypes } from "sequelize";
import { sequelize } from "../database/dbConection.js";
import {entries} from "./entryJournalModel.js";

// set up the model with the database
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

// links the user with the entryJournal via the userUuid
users.hasMany(entries,{
    foreignKey: "userUuid", 
    sourceKey: "uuid"
});

// links the entryJournal with the user via the userUuid
entries.belongsTo(users,{
    foreignKey: "userUuid",
    sourceKey: "uuid"
});