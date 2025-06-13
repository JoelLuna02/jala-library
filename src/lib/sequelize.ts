/* eslint-disable @typescript-eslint/no-require-imports */
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	dialect: "postgres",
	dialectModule: require("pg"),
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432", 10),
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});
