import { initDB } from "@/lib/initdb";

export default async function handler(req, res) {
	try {
		await initDB();
		res.status(200).json({ message: "DB synced" });
	} catch (error) {
		console.error("Error initializing database:", error);
		res.status(500).json({ error: "Failed to initialize database" });
	}
}
