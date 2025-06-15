import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";
import Book from "./Book";
import Author from "./Author";

const BookAuthor = sequelize.define(
	"BookAuthor",
	{
		book_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
		author_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
	},
	{
		timestamps: false,
		tableName: "jalalibrary_book_authors",
	},
);

Book.belongsToMany(Author, {
	through: BookAuthor,
	foreignKey: "book_id",
});

Author.belongsToMany(Book, {
	through: BookAuthor,
	foreignKey: "author_id",
});

export default BookAuthor;
