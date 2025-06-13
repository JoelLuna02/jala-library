import bcrypt from "bcrypt";

import { initDB } from "@/lib/initdb";
import User from "../../../models/User";

export default async function handler(req, res) {
	if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
	const validRoles = ["admin", "employee", "client"];
	const { firstname, lastname, email, username, password, role } = req.body;
	try {
		await initDB();
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res.status(400).json({ error: "Username already exists" });
		}
		const existingEmail = await User.findOne({ where: { email } });
		if (existingEmail) {
			return res.status(400).json({ error: "Email already exists" });
		}
		if (role != null) {
			if (!validRoles.includes(role)) {
				return res.status(400).json({ message: "Invalid role" });
			}
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			firstname,
			lastname,
			email,
			username,
			password: hashedPassword,
			role: role || "reader", // Default to 'reader' if no role is provided
		});
		return res.status(201).json({
			data: {
				user_id: newUser.user_id,
				firstname: newUser.firstname,
				lastname: newUser.lastname,
				email: newUser.email,
				username: newUser.username,
				role: newUser.role,
			},
			message: "User registered successfully",
		});
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}
