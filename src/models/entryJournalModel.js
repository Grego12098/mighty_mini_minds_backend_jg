import { DataTypes } from "sequelize";
import { sequelize } from "../database/dbConection.js";



export const entries = sequelize.define("entries", {
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    mood:{
        type: DataTypes.INTEGER,
    },
    question_one:{
        type: DataTypes.STRING,
    },
    question_two:{
        type: DataTypes.STRING,
    },
    question_three:{
        type: DataTypes.STRING,
    },
    answer_one:{
        type: DataTypes.STRING(1000),
    },
    answer_two:{
        type: DataTypes.STRING(1000),
    },
    answer_three:{
        type: DataTypes.STRING(1000),
    },
    share:{
        type: DataTypes.BOOLEAN,
    },
    user_uuid:{
        type: DataTypes.UUID,
    }
});
