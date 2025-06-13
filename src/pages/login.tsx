import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { ModeToggle } from "@/components/ToggleTheme";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const result = await signIn("credentials", {
			redirect: false,
			username,
			password,
		});
		if (result?.ok) {
			router.push("/library");
		} else {
			setError(result?.error || "Invalid credentials");
		}
	};

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>

			<ModeToggle />

			<div>Login secction</div>
			<form onSubmit={handleLogin}>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<div>
					<label htmlFor="username">Email</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Contraseña</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Iniciar Sesión</button>
			</form>
		</>
	);
}
