import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

export default function Library() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);
	if (status === "loading") {
		return <p>Cargando...</p>;
	}
	return (
		<>
			<Head>
				<title>Jala Library - Main Page</title>
			</Head>
			{session && (
				<div>
					<h1>Perfil de Usuario</h1>
					<p>¡Bienvenido, {session.user?.username}!</p>
					<p>Email: {session.user?.email}</p>
					<p>ID de Usuario: {session.user?.id}</p>
					<p>Rol: {session.user?.role}</p>
					<button onClick={() => signOut({ callbackUrl: "/login" })}>Cerrar Sesión</button>
				</div>
			)}
		</>
	);
}
