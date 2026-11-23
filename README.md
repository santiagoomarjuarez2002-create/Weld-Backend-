# Weld Backend

API REST de Weld desarrollada con NestJS, TypeScript, Prisma y PostgreSQL. Incluye registro e inicio de sesión, gestión de usuarios, productos, pedidos y detalles de pedido.

## Instalación y ejecución

Necesitás Node.js, npm y una base de datos PostgreSQL. Desde la carpeta `Weld-Backend-`, ejecutá `npm install` y creá un archivo `.env` con los datos de tu entorno:

```dotenv
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/weld
JWT_SECRET=reemplazar_por_una_clave_secreta
PORT=3001
```

Aplicá las migraciones a la base configurada e iniciá el servidor:

```bash
npx prisma migrate deploy --config prisma7.config.ts
npm run start:dev
```

La API escucha en `http://localhost:3001` por defecto. `GET /` devuelve `Hola Programacion`.

## Endpoints

| Recurso | Rutas |
| --- | --- |
| Auth | `POST /auth/register`, `POST /auth/login` |
| Usuarios | `GET /usuarios`, `GET /usuarios/:id`, `PUT /usuarios/:id`, `PATCH /usuarios/:id`, `DELETE /usuarios/:id` |
| Productos | `GET /productos`, `GET /productos/:id`, `POST /productos`, `PUT /productos/:id`, `PATCH /productos/:id`, `DELETE /productos/:id` |
| Pedidos | `GET /pedidos`, `GET /pedidos/:id`, `POST /pedidos`, `PUT /pedidos/:id`, `PATCH /pedidos/:id`, `DELETE /pedidos/:id` |
| Detalles de pedido | `GET /detalle-pedidos`, `GET /detalle-pedidos/:id`, `POST /detalle-pedidos`, `PUT /detalle-pedidos/:id`, `PATCH /detalle-pedidos/:id`, `DELETE /detalle-pedidos/:id` |

El registro crea el usuario, guarda la contraseña con bcrypt y excluye el hash de la respuesta. El login verifica las credenciales y devuelve un `access_token` JWT con una duración de una hora. Las rutas CRUD están disponibles sin token en la versión actual.

## Ejemplos para probar en Postman

Usá **Body → raw → JSON** para `POST`, `PUT` y `PATCH`. Enviá todos los campos obligatorios en `PUT`. En `PATCH` podés enviar solo los campos a modificar, por ejemplo `{"precio": 150.75}` a `/productos/1`.

### Registro y login

`POST /auth/register`

```json
{
  "nombre": "Joaquin",
  "apellido": "Bernardo",
  "telefono": "1123456789",
  "dni": "12345678",
  "provincia": "Buenos Aires",
  "localidad": "La Plata",
  "direccion": "Calle 10 123",
  "email": "joaquin@example.com",
  "password": "Clave123!"
}
```

Para `POST /auth/login`, enviá el mismo `email` y `password`. El `PATCH /usuarios/:id` usa un DTO de actualización de perfil.

### Productos

`POST /productos`

```json
{
  "nombre": "Remera Weld",
  "descripcion": "Remera de algodón de manga corta",
  "precio": 125.50,
  "stock_s": 5,
  "stock_m": 8,
  "stock_l": 4,
  "stock_xl": 0
}
```

### Pedidos y detalles

`POST /pedidos`

```json
{
  "usuario_id": 1,
  "direccion_envio": "Calle 10 123",
  "costo_envio": 50.00
}
```

`POST /detalle-pedidos`

```json
{
  "pedido_id": 1,
  "producto_id": 1,
  "cantidad": 2,
  "talle": "M",
  "precio_unitario": 125.50
}
```

Reemplazá los IDs de los ejemplos por los que devuelve la API al crear cada registro. El DTO del detalle valida que la cantidad sea un entero positivo y que el talle sea `S`, `M`, `L` o `XL`. El servicio guarda el detalle sin consultar ni descontar stock.

## Validaciones y respuestas HTTP

El `ValidationPipe` global valida los DTO antes de ejecutar el servicio. Los servicios manejan registros inexistentes y errores de escritura de Prisma.

| Código | Ejemplo |
| --- | --- |
| **400 Bad Request** | «Falta completar los datos obligatorios.» si falta un campo requerido. Si el formato es inválido, se devuelve el mensaje de validación correspondiente. |
| **401 Unauthorized** | «Correo o contraseña incorrectos.» si las credenciales del login son incorrectas. |
| **404 Not Found** | El usuario, producto, pedido o detalle solicitado no existe. |
| **409 Conflict** | El correo ya está registrado o la operación entra en conflicto con registros relacionados. |

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run start:dev` | Ejecutar en desarrollo |
| `npm start` | Iniciar con Nest CLI |
| `npm run build` | Compilar |
| `npm run lint` | Analizar el código |
| `npm test` | Ejecutar pruebas con Vitest |
| `npm run test:e2e` | Ejecutar pruebas de extremo a extremo |

## Trabajo con ramas

- `main` para la versión estable.
- `dev` para integrar cambios.
- `feature/nombre-funcionalidad`, `fix/nombre-correccion`, `refactor/nombre-cambio` y `docs/nombre-documentacion` para preparar cambios.

## Integrantes

- Joaquin Bernardo
- Santiago Juarez
- Santiago Acosta
- Leonel Ferrari
