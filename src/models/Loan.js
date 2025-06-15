import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";
import User from "./User";

const Loan = sequelize.define(
    "Loan",
    {
        loan_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, references: { model: "jalalibrary_users", key: "user_id" }, allowNull: false },
        loan_date: { type: DataTypes.DATE, allowNull: false },
        return_date: { type: DataTypes.DATE, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" }, // active, returned, overdue
    },
    {
        timestamps: true,
        tableName: "jalalibrary_loans",
    },
);

Loan.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Loan, { foreignKey: "user_id" });

export default Loan;