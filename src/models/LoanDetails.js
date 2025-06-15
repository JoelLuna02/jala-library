import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";
import Loan from "./Loan";
import Book from "./Book";

const LoanDetails = sequelize.define(
    "LoanDetails",
    {
        loandetails_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        loan_id: { type: DataTypes.INTEGER, references: { model: "jalalibrary_loans", key: "loan_id" }, allowNull: false },
        book_id: { type: DataTypes.INTEGER, references: { model: "jalalibrary_books", key: "book_id" }, allowNull: false },
        return_date: { type: DataTypes.DATE, allowNull: true },
        book_status: { type: DataTypes.STRING, allowNull: false },
        notes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
        timestamps: true,
        tableName: "jalalibrary_loan_details",
    },
);

Loan.hasMany(LoanDetails, { foreignKey: 'loan_id' });
LoanDetails.belongsTo(Loan, { foreignKey: 'loan_id' });
Book.hasMany(LoanDetails, { foreignKey: 'book_id' });
LoanDetails.belongsTo(Book, { foreignKey: 'book_id' });

export default LoanDetails;