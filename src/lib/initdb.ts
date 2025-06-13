/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { sequelize } from "./sequelize";
import User from "../models/User";

export async function initDB() {
	await sequelize.authenticate();
	await sequelize.sync({ alter: true });
	console.log(" Ping to the database");
}
