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
    questionOne:{
        type: DataTypes.STRING,
    },
    questionTwo:{
        type: DataTypes.STRING,
    },
    questionThree:{
        type: DataTypes.STRING,
    },
    answerOne:{
        type: DataTypes.STRING(1000),
    },
    answerTwo:{
        type: DataTypes.STRING(1000),
    },
    answerThree:{
        type: DataTypes.STRING(1000),
    },
    share:{
        type: DataTypes.BOOLEAN,
    }
});