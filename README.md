Club Management App
Descripción
La Club Management App es una aplicación diseñada para gestionar de manera eficiente un club. Ofrece funcionalidades para administrar socios, organizar actividades y controlar el acceso basado en las inscripciones.

Estado
En desarrollo.

Características Principales
Gestión de Socios:

Creación de nuevos socios.
Búsqueda y visualización del estado de los socios.
Actividades del Club:

Agregar actividades a los socios.
Crear, modificar y eliminar actividades del club.
Control de Acceso:

Basado en las inscripciones de los socios.
Tecnologías Utilizadas
Frontend: React.js con Bootstrap para estilos.
Backend: Node.js y Express para el servidor.
Base de Datos: MongoDB para almacenamiento de datos.
Instalación y Ejecución
Sigue estos pasos para clonar y ejecutar la aplicación:

Clonar el Repositorio:

bash
Copiar código
git clone https://github.com/Skarvy/ClubApp
Instalar Dependencias:

Navega a la carpeta del proyecto:

bash
Copiar código
cd clubapp
Luego, instala las dependencias del backend:

bash
Copiar código
npm install
Y luego las del frontend:

bash
Copiar código
cd frontend
npm install
cd ..
Configurar Variables de Entorno:

Asegúrate de configurar el archivo .env con la variable MONGO_DB_URI para la conexión a MongoDB.

Iniciar el Servidor:

Desde la raíz del proyecto, ejecuta el servidor:

bash
Copiar código
npm run server
Iniciar el Frontend:

En una nueva terminal, navega a la carpeta del frontend y ejecuta:

bash
Copiar código
cd frontend
npm run dev
