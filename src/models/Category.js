import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

const Category = sequelize.define(
    "Category",
    {
        category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: { type: DataTypes.TEXT, allowNull: true },
    },
    {
        timestamps: true,
        tableName: "jalalibrary_categories",
    },
);

export default Category;