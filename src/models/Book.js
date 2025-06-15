import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";
import Editorial from "./Editorial";
import Category from "./Category";

const Book = sequelize.define(
	"Book",
	{
		book_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		title: { type: DataTypes.STRING, allowNull: false },
		isbn: { type: DataTypes.STRING, unique: true },
		description: { type: DataTypes.TEXT, allowNull: true },
		available_copies: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		total_copies: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		editorial_id: {
			type: DataTypes.INTEGER,
			references: { model: "jalalibrary_editorials", key: "editorial_id" },
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER,
			references: { model: "jalalibrary_categories", key: "category_id" },
			allowNull: false,
		},
	},
	{
		tableName: "jalalibrary_books",
		timestamps: true,
	},
);

Editorial.hasMany(Book, { foreignKey: "editorial_id" });
Book.belongsTo(Editorial, { foreignKey: "editorial_id" });
Category.hasMany(Book, { foreignKey: "category_id" });
Book.belongsTo(Category, { foreignKey: "category_id" });

export default Book;
