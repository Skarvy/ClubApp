# Club Management App

## Descripción

La **Club Management App** es una aplicación diseñada para gestionar de manera eficiente un club. Ofrece funcionalidades para administrar socios, organizar actividades y controlar el acceso basado en las inscripciones.

## Estado

En desarrollo.

## Características Principales

- **Gestión de Socios**:
  - Creación de nuevos socios.
  - Búsqueda y visualización del estado de los socios.

- **Actividades del Club**:
  - Agregar actividades a los socios.
  - Crear, modificar y eliminar actividades del club.

- **Control de Acceso**:
  - Basado en las inscripciones de los socios.

## Tecnologías Utilizadas

- **Frontend**: React.js con Bootstrap para estilos.
- **Backend**: Node.js y Express para el servidor.
- **Base de Datos**: MongoDB para almacenamiento de datos.

## Instalación y Ejecución

Sigue estos pasos para clonar y ejecutar la aplicación:

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/Skarvy/ClubApp


2. **Instalar Dependencias**:

Navega a la carpeta del proyecto:

```bash
cd clubapp
```
Luego, instala las dependencias del backend:

```bash
npm install
```
Y luego las del frontend:

```bash
cd frontend
npm install
cd ..
```

Configurar Variables de Entorno:

Asegúrate de configurar el archivo .env con la variable MONGO_DB_URI para la conexión a MongoDB.

Iniciar el Servidor:

Desde la raíz del proyecto, ejecuta el servidor:

```bash
npm run server
```

Iniciar el Frontend:

En una nueva terminal, navega a la carpeta del frontend y ejecuta:

```bash
npm run dev
```
