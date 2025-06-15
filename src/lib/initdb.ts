/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { sequelize } from "./sequelize";

import Author from "@/models/Author";
import Book from "@/models/Book";
import BookAuthor from "@/models/BookAuthor";
import Category from "@/models/Category";
import Editorial from "@/models/Editorial";
import Loan from "@/models/Loan";
import LoanDetails from "@/models/LoanDetails";
import Role from "@/models/Role";
import User from "@/models/User";

export async function initDB() {
	await sequelize.authenticate();
	await sequelize.sync({ alter: true });
	console.log(" Ping to the database");
}
