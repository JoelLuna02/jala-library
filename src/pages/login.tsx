import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { ModeToggle } from "@/components/ToggleTheme";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import FlashMessage from "@/components/FlashMessage";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			redirect: false,
			username,
			password,
		});
		if (result?.ok) {
			router.push("/library");
		} else {
			router.push(`/login?error=${encodeURIComponent("Error al iniciar sesión")}`);
		}
	};

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>

			<ModeToggle />

			<Card className="max-w-md mx-auto mt-10 p-6">
				<CardContent>
					<form onSubmit={handleLogin} className="space-y-4">
						<h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
						<hr />
						<FlashMessage />
						<div>
							<Label>Usuario</Label>
							<Input name="username" onChange={(e) => setUsername(e.target.value)} required />
						</div>
						<div>
							<Label>Contraseña</Label>
							<Input
								name="password"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button type="submit">Iniciar sesión</Button>
						<p className="text-sm text-gray-500">
							¿No tienes una cuenta?{" "}
							<Link href="/register" className="text-blue-500 hover:underline">
								Registrarse
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</>
	);
}
