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
	await Role.findOrCreate({
		where: { name: "reader" },
		defaults: { description: "Usuario que puede solicitar préstamos" },
	});

	await Role.findOrCreate({
		where: { name: "employee" },
		defaults: { description: "Empleado con privilegios de gestión" },
	});

	const categorias = ["Novela", "Ficción", "Historia", "Tecnología", "Ciencia", "Filosofía"];
	for (const name of categorias) {
		await Category.findOrCreate({
			where: { name },
			defaults: { description: `Categoría: ${name}` },
		});
	}

	const autores = [
		"Gabriel García Márquez",
		"Isaac Asimov",
		"Julio Cortázar",
		"George Orwell",
		"Jane Austen",
		"Mark Twain",
	];
	for (const name of autores) {
		await Author.findOrCreate({
			where: { name },
			defaults: { nationality: "Desconocida" },
		});
	}
	console.log(" Ping to the database");
}
