import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

const Author = sequelize.define(
    "Author",
    {
        author_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        nationality: { type: DataTypes.STRING, allowNull: false },
    },
    {
        timestamps: true,
        tableName: "jalalibrary_authors",
    },
);

export default Author;