### 1. Usuario (User) tabla: jalalibrary_user

- id (PK)
- nombres
- apellidos
- nombre_usuario
- correo
- contraseña
- rol (lector, empleado)
  - 🔗 Tiene muchos Prestamo

### 2. Editorial (Editorial) tabla: jalalibrary_editorial

- id (PK)
- nombre
- pais
  - 🔗 Una editorial tiene muchos libros

### 3. Autor (Autor) tabla: jalalibrary_author

- id (PK)
- nombre
- nacionalidad
  - 🔗 Un autor puede escribir muchos libros y un libro puede tener varios autores → relación muchos a muchos

### 4. Libro (Libro) tabla: jalalibrary_book

- id (PK)
- titulo
- isbn
- descripcion
- cantidad_total
- cantidad_disponible
- editorial_id (FK a Editorial)
  - 🔗 Relación N:M con Autor (tabla intermedia LibroAutor)
  - 🔗 Relación 1:N con DetallePrestamo

### 5. Préstamo (Prestamo) tabla: jalalibrary_loan

- id (PK)
- usuario_id (FK a User)
- fecha_prestamo
- fecha_devolucion
- estado (activo, devuelto, atrasado)
  - 🔗 Relación 1:N con DetallePrestamo

### 6. DetallePréstamo (DetallePrestamo) tabla: jalalibrary_loandetails

- id (PK)
- prestamo_id (FK a Prestamo)
- libro_id (FK a Libro)
- fecha_devolucion (puede ser null)
- estado_libro (devuelto, dañado, perdido)
- notas (observaciones)

### 7. LibroAutor (tabla intermedia) tabla: jalalibrary_bookauthor

- id (PK)
- libro_id (FK a Libro)
- autor_id (FK a Autor)
