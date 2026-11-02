# Weld Backend

Backend del proyecto Weld, desarrollado con NestJS y TypeScript para gestionar usuarios, productos, talles y pedidos mediante una API REST. Corresponde a la estructura inicial solicitada en el Trabajo Práctico N.º 9.

## Estado del proyecto

Los recursos tienen controladores, servicios, DTO y entidades generados, y sus módulos están importados en `AppModule`. Las operaciones CRUD son una estructura inicial: la lógica de negocio, la autenticación y la persistencia en la base de datos están pendientes de implementación.

## Requisitos e instalación

- Node.js compatible con las dependencias del proyecto.
- npm.
- Un gestor de base de datos relacional para preparar las tablas y los datos del TP.

Ejecutar los comandos desde la carpeta que contiene `package.json`:

```bash
npm install
npm run start:dev
```

El modo de desarrollo recompila la aplicación cuando se modifican los archivos.

## Variables de entorno y puerto

Crear un archivo `.env` en la raíz del proyecto con estas variables. Los valores siguientes son orientativos; completar la conexión según la base de datos del equipo:

```dotenv
PORT=4001
DATABASE_URL=<cadena_de_conexion_de_la_base_de_datos>
API_BASE_URL=http://localhost:4001
```

El archivo `.env` está excluido de Git. No subir credenciales al repositorio.

Actualmente `main.ts` escucha en `process.env.PORT ?? 3000`, pero el proyecto no tiene configurada la carga automática del `.env`. Sin una variable `PORT` definida en el entorno del proceso, el comando `npm run start:dev` utiliza el puerto **3000**.

Para ejecutar en el puerto **4001** desde PowerShell con la configuración actual:

```powershell
$env:PORT = '4001'
npm run start:dev
```

Esto define el puerto para esa sesión de terminal; no carga las demás variables del `.env`. Queda pendiente incorporar un mecanismo de carga si se desea usar el archivo al iniciar la aplicación.

`API_BASE_URL` documenta la dirección base: no modifica el puerto ni crea rutas. `DATABASE_URL` todavía no está conectada a una implementación de persistencia.

## Estructura

```text
src/
├── main.ts
└── modules/
    ├── App/
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   └── app.service.ts
    ├── auth/
    ├── detalles-pedido/
    ├── imagenes-producto/
    ├── pedidos/
    ├── productos/
    ├── productos-talles/
    ├── talles/
    ├── usuarios/
    └── ejercicios.ts
```

Cada recurso contiene su módulo, controlador, servicio y carpetas `dto` y `entities`. `main.ts` permanece en `src` y es el punto de entrada.

## Rutas de la API

No hay un prefijo global configurado. Usar como base `http://localhost:3000`, o `http://localhost:4001` si se inicia con `PORT=4001`.

| Módulo | Ruta base |
| --- | --- |
| App | `/` |
| Auth | `/auth` |
| Detalles de pedido | `/detalles-pedido` |
| Imágenes de producto | `/imagenes-producto` |
| Pedidos | `/pedidos` |
| Productos | `/productos` |
| Productos y talles | `/productos-talles` |
| Talles | `/talles` |
| Usuarios | `/usuarios` |

`GET /` devuelve `Hola Programacion`. Los ocho recursos restantes tienen las siguientes rutas generadas, donde `:id` representa el identificador del recurso:

| Método | Ruta relativa al recurso | Operación prevista |
| --- | --- | --- |
| POST | `/` | Crear |
| GET | `/` | Listar |
| GET | `/:id` | Consultar uno |
| PATCH | `/:id` | Actualizar |
| DELETE | `/:id` | Eliminar |

Por ejemplo: `GET http://localhost:4001/productos`, si el backend se inició en el puerto 4001. Estas rutas aún no implican operaciones reales sobre la base de datos. El recurso `auth` también conserva el CRUD generado; todavía no implementa un inicio de sesión.

## Comandos disponibles

| Comando | Uso |
| --- | --- |
| `npm run start:dev` | Ejecutar en desarrollo con observación de cambios |
| `npm start` | Iniciar con Nest CLI |
| `npm run build` | Compilar el proyecto |
| `npm run lint` | Analizar el código |
| `npm test` | Ejecutar pruebas con Vitest |
| `npm run test:e2e` | Ejecutar pruebas de extremo a extremo |

La disponibilidad de estos comandos no garantiza que sus comprobaciones estén aprobadas.

## Base de datos y entrega del TP

La base de datos puede prepararse de forma independiente del backend en esta etapa. Para completar la entrega se debe verificar:

- Creación de las tablas con columnas, tipos de datos y claves primarias.
- Relaciones, claves foráneas y restricciones que mantengan la integridad de los datos.
- Al menos cinco registros por tabla y comprobación de su inserción.
- Ejecución correcta de la aplicación y coherencia entre el puerto y la URL base.
- Acceso al repositorio de todos los integrantes y Pull Requests documentados.

Este repositorio no incluye un script SQL que permita confirmar la estructura o los registros de la base de datos.

## Trabajo con ramas

- `main`: versión estable.
- `dev`: integración del desarrollo.
- `feature/nombre-funcionalidad`: nuevas funcionalidades.
- `fix/nombre-correccion`: correcciones.
- `refactor/nombre-cambio`: reorganización o mejora del código.
- `docs/nombre-documentacion`: documentación.

Realizar commits descriptivos y abrir Pull Requests hacia la rama de integración para revisar los cambios antes de incorporarlos a la versión estable.

## Integrantes

Pendiente de completar con los nombres y usuarios de GitHub del equipo.
