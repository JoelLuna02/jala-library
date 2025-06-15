/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
	const [books, setBooks] = useState([]);
	const { data: session, status } = useSession();
	const router = useRouter();
	const [filters, setFilters] = useState({
		title: "",
		author: "",
		editorial: "",
	});

	const fetchBooks = async () => {
		const query = new URLSearchParams(filters);
		const res = await fetch(`/api/books?${query.toString()}`);
		const data = await res.json();
		setBooks(data);
	};

	useEffect(() => {
		fetchBooks();
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [session, router, fetchBooks]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetchBooks();
	};

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Libros registrados</h1>

			<form onSubmit={handleSearch} className="flex gap-4 mb-4">
				<Input name="titulo" placeholder="Título" value={filters.title} onChange={handleChange} />
				<Input name="autor" placeholder="Autor" value={filters.author} onChange={handleChange} />
				<Input
					name="editorial"
					placeholder="Editorial"
					value={filters.editorial}
					onChange={handleChange}
				/>
				<Button type="submit">Buscar</Button>
			</form>

			<div className="mb-4 flex gap-4">
				{session?.user?.role === "employee" && (
					<>
						<Button
							onClick={() => router.push("/dashboard/new-book")}
							className="bg-blue-600 text-white px-4 py-2 rounded"
						>
							Agregar Libro
						</Button>
						<Button
							onClick={() => router.push("/dashboard/new-editorial")}
							className="bg-gray-700 text-white px-4 py-2 rounded"
						>
							Agregar Editorial
						</Button>
					</>
				)}
			</div>

			<ul className="space-y-2">
				{books.map((libro) => (
					<li key={libro.book_id} className="border p-4 rounded">
						<strong>{libro.title}</strong> — {libro.Editorial?.nombre} ({libro.Category?.nombre})
						<div className="text-sm text-gray-500">ISBN: {libro.isbn}</div>
					</li>
				))}
			</ul>
		</div>
	);
}
