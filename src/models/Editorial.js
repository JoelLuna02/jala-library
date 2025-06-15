import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

const Editorial = sequelize.define(
    "Editorial",
    {
        editorial_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        country: { type: DataTypes.STRING, allowNull: true },
    },
    {
        timestamps: true,
        tableName: "jalalibrary_editorials",
    },
);

export default Editorial;