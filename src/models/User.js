import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

const User = sequelize.define(
	"User",
	{
		user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		firstname: { type: DataTypes.STRING, allowNull: false },
		lastname: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
		role: { type: DataTypes.ENUM("reader", "employee"), allowNull: false, defaultValue: "reader" },
	},
	{
		timestamps: true,
		tableName: "jalalibrary_users",
	},
);

export default User;
