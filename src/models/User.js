import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";
import Role from "./Role"

const User = sequelize.define(
	"User",
	{
		user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		firstname: { type: DataTypes.STRING, allowNull: false },
		lastname: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
		role: { type: DataTypes.INTEGER, references: { model: "jalalibrary_roles", key: "role_id" }, allowNull: false },
	},
	{
		timestamps: true,
		tableName: "jalalibrary_users",
	},
);

User.belongsTo(Role, {foreignKey: "role_id"});
Role.hasMany(User, {foreignKey: "role_id"});

export default User;
