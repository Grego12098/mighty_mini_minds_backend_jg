import { DataTypes } from "sequelize";
import { sequelize } from "../database/dbConection.js";

export const entryJournal = sequelize.define("entryJournal", {
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    mood:{
        type: DataTypes.INTEGER,
    },
    questionOne:{
        type: DataTypes.INTEGER,
    },
    questionTwo:{
        type: DataTypes.INTEGER,
    },
    questionThree:{
        type: DataTypes.INTEGER,
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