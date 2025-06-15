import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FlashMessage from "@/components/FlashMessage";

import Link from "next/link";

export default function RegisterPage() {
	const [form, setForm] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		role: "",
	});
	const router = useRouter();
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const res = await fetch("/api/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		const data = await res.json();
		if (res.status === 201) {
			router.push(`/login?success=${encodeURIComponent(data.message)}`);
		} else {
			router.push(`/register?error=${encodeURIComponent(data.message)}`);
		}
	};

	return (
		<Card className="max-w-md mx-auto mt-10 p-6">
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4" method="POST">
					<h2 className="text-2xl font-bold mb-4">Registrarse</h2>
					<hr />
					<FlashMessage />
					<div>
						<Label>Nombre</Label>
						<Input name="firstname" onChange={handleChange} />
					</div>
					<div>
						<Label>Apellido</Label>
						<Input name="lastname" onChange={handleChange} />
					</div>
					<div>
						<Label>Usuario</Label>
						<Input name="username" onChange={handleChange} />
					</div>
					<div>
						<Label>Correo</Label>
						<Input name="email" type="email" onChange={handleChange} />
					</div>
					<div>
						<Label>Contraseña</Label>
						<Input name="password" type="password" onChange={handleChange} />
					</div>
					<div>
						<Label>Rol:</Label>
						<select
							name="role"
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						>
							<option value="reader">Lector</option>
							<option value="employee">Empleado</option>
						</select>
					</div>
					<Button type="submit">Registrarse</Button>
					<p className="text-sm text-gray-500">
						¿Ya tienes una cuenta?{" "}
						<Link href="/login" className="text-blue-500 hover:underline">
							Iniciar sesión
						</Link>
					</p>
				</form>
			</CardContent>
		</Card>
	);
}
