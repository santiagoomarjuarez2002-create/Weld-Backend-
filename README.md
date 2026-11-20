# Weld Backend

API REST para Weld, construida con NestJS, TypeScript, Prisma 7 y PostgreSQL. Actualmente incluye gestión de usuarios, productos, pedidos y detalles de pedido, además de registro e inicio de sesión con JWT. La versión declarada en `package.json` es `0.0.1`.

## Requisitos

- Node.js y npm.
- PostgreSQL y una base de datos creada para el proyecto.
- Las variables de entorno `DATABASE_URL` y `JWT_SECRET`.

## Configuración y ejecución

Desde la carpeta que contiene `package.json`:

```bash
npm install
```

Configurar las variables en un archivo `.env` en esa carpeta:

```env
DATABASE_URL="postgresql://USUARIO:CONTRASENA@localhost:5432/weld?schema=public"
JWT_SECRET="reemplazar-por-un-secreto-seguro"
```

Aplicar las migraciones existentes y ejecutar la API:

```bash
npx prisma migrate deploy --config prisma7.config.ts
npm run start:dev
```

El cliente de Prisma se genera durante la instalación y antes de iniciar en modo desarrollo o compilar. La aplicación escucha en `http://localhost:3000`; se puede cambiar el puerto con `PORT`.

En PowerShell, por ejemplo:

```powershell
$env:PORT = '4001'
npm run start:dev
```

## Persistencia y validación

- Prisma conecta a PostgreSQL mediante `DATABASE_URL`. La aplicación requiere esta variable y `JWT_SECRET` para iniciar.
- El esquema define `usuarios`, `productos`, `pedidos` y `detalles_pedido`; los pedidos se relacionan con usuarios y sus detalles con productos.
- Las contraseñas se guardan como hash y no se incluyen en las respuestas de usuarios.
- `main.ts` registra un `ValidationPipe` global. Los DTOs de creación validan los campos y los DTOs de actualización permiten campos parciales.
- Los IDs de ruta se validan como enteros. Las operaciones sobre registros inexistentes responden con error 404; el email duplicado y la eliminación de usuarios con pedidos relacionados responden con error 409.
- El login emite un JWT con vigencia de una hora. En el estado actual no hay guards que exijan el token para acceder a las rutas de gestión.

## Endpoints

Base URL local: `http://localhost:3000`

| Recurso | Rutas |
| --- | --- |
| Usuarios | `/usuarios` |
| Productos | `/productos` |
| Pedidos | `/pedidos` |
| Detalles de pedido | `/detalle-pedidos` |
| Autenticación | `/auth/register`, `/auth/login` |

Usuarios, productos, pedidos y detalles de pedido ofrecen las operaciones CRUD:

| Método | Ruta | Operación |
| --- | --- | --- |
| GET | `/recurso` | Listar |
| GET | `/recurso/:id` | Consultar por ID |
| POST | `/recurso` | Crear |
| PUT | `/recurso/:id` | Reemplazar con un cuerpo completo |
| PATCH | `/recurso/:id` | Actualizar campos enviados |
| DELETE | `/recurso/:id` | Eliminar |

`GET /` responde `Hola Programacion`. Las respuestas de CRUD contienen los registros de la base de datos. El registro responde con los datos del usuario creado, sin su hash de contraseña; el login responde con `access_token` y los datos públicos del usuario.

## Ejemplos de solicitudes

Enviar los cuerpos como JSON (`Content-Type: application/json`). Las rutas CRUD con `:id` esperan el ID numérico del registro.

### Registrar usuario

`POST /auth/register`  
`POST /usuarios` acepta el mismo cuerpo.

```json
{
  "nombre": "Joaquin",
  "apellido": "Perez",
  "telefono": "1122334455",
  "dni": "12345678",
  "provincia": "Buenos Aires",
  "localidad": "La Plata",
  "direccion": "Calle 123",
  "email": "joaquin@example.com",
  "password": "Clave123!"
}
```

Los campos son obligatorios. El email debe ser válido y tener hasta 254 caracteres; la contraseña debe tener entre 8 y 128 caracteres, con al menos una minúscula, una mayúscula, un número y un símbolo. Los demás campos son texto y deben respetar los máximos definidos por el esquema: nombre, apellido, provincia y localidad 100 caracteres; teléfono 15; DNI 10; dirección 100.

### Iniciar sesión

`POST /auth/login`

```json
{
  "email": "joaquin@example.com",
  "password": "Clave123!"
}
```

Si las credenciales son válidas, la respuesta incluye un JWT con vencimiento de una hora. Las credenciales incorrectas responden `401 Unauthorized`.

### Crear producto

`POST /productos`

```json
{
  "nombre": "Remera Weld",
  "descripcion": "Remera de algodón para uso diario",
  "precio": 12500.5,
  "stock_s": 10,
  "stock_m": 12,
  "stock_l": 8,
  "stock_xl": 4
}
```

El nombre debe tener entre 3 y 150 caracteres; la descripción, entre 15 y 255. El precio debe ser positivo y tener hasta dos decimales. Los cuatro stocks son enteros no negativos.

### Crear pedido

`POST /pedidos`

```json
{
  "usuario_id": 1,
  "direccion_envio": "Calle 123, La Plata",
  "costo_envio": 1500
}
```

`usuario_id` debe ser un entero positivo correspondiente a un usuario existente. La dirección es obligatoria y admite hasta 255 caracteres; el costo de envío debe ser un número no negativo con hasta dos decimales.

### Crear detalle de pedido

`POST /detalle-pedidos`

```json
{
  "pedido_id": 1,
  "producto_id": 1,
  "cantidad": 2,
  "talle": "M",
  "precio_unitario": 12500.5
}
```

Los IDs y la cantidad deben ser enteros positivos, el talle debe ser `S`, `M`, `L` o `XL`, y el precio unitario debe ser positivo con hasta dos decimales.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run start:dev` | Ejecutar en desarrollo con recarga |
| `npm start` | Ejecutar con Nest CLI |
| `npm run start:prod` | Ejecutar desde `dist` |
| `npm run build` | Generar el cliente Prisma y compilar |
| `npm run prisma:generate` | Generar el cliente Prisma |
| `npm run lint` | Analizar el código |
| `npm test` | Ejecutar pruebas unitarias con Vitest |
| `npm run test:e2e` | Ejecutar pruebas e2e con Vitest |
| `npm run test:cov` | Ejecutar pruebas con cobertura |

## Colección de Postman

El archivo `Weld.postman_collection.json` todavía contiene solicitudes y respuestas de una versión anterior basada en mensajes de prueba. No está sincronizado con los DTOs, la persistencia ni las rutas de autenticación actuales; verificar o actualizar sus ejemplos antes de usarla para probar esta versión.

## Estructura principal

```text
src/
|-- main.ts
|-- prisma/
|-- modules/
|   |-- App/
|   |-- auth/
|   |-- pedidos/
|   |   `-- detalle-pedidos/
|   |-- productos/
|   `-- usuarios/
`-- generated/prisma/
prisma/
|-- schema.prisma
`-- migrations/
```

## Integrantes

- Joaquin Bernardo
- Santiago Juarez
- Santiago Acosta
- Leonel Ferrari
