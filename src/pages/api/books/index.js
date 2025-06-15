import Book from "../../../models/Book";
import Editorial from "../../../models/Editorial";
import Category from "../../../models/Category";
import Author from "../../../models/Author";

import { Op } from "sequelize";

export default async function handler(req, res) {
	const { titulo, autor, editorial } = req.query;

	const where = {};
	const include = [];

	if (titulo) {
		where.titulo = { [Op.iLike]: `%${titulo}%` };
	}

	include.push({
		model: Author,
		where: autor ? { nombre: { [Op.iLike]: `%${autor}%` } } : undefined,
		through: { attributes: [] },
	});

	include.push({
		model: Editorial,
		where: editorial ? { nombre: { [Op.iLike]: `%${editorial}%` } } : undefined,
	});

	include.push({ model: Category });

	const books = await Book.findAll({
		where,
		include,
		limit: 50,
	});

	return res.json(books);
}
