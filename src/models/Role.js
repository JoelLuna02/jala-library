import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

const Role = sequelize.define(
    "Role",
    {
        role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: { type: DataTypes.STRING, allowNull: true },
    },
    {
        timestamps: true,
        tableName: "jalalibrary_roles",
    },
);

export default Role;
