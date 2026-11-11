# Weld Backend

API REST con NestJS y TypeScript para el **TP 10: DTO y validación de datos**.

## Ejecutar

Desde la carpeta que contiene `package.json`:

```bash
npm install
npm run start:dev
```

URL base: **http://localhost:3000**. El puerto puede cambiarse con la variable de entorno `PORT`; el archivo `.env` no se carga automáticamente.

## Módulos y endpoints

Recursos disponibles: `usuarios`, `productos`, `pedidos` y `auth`.

| Método | Ruta | Operación |
| --- | --- | --- |
| GET | `/recurso` | Listar todos |
| GET | `/recurso/:id` | Consultar uno |
| POST | `/recurso` | Crear |
| PUT | `/recurso/:id` | Reemplazar |
| PATCH | `/recurso/:id` | Actualizar parcialmente |
| DELETE | `/recurso/:id` | Eliminar |

Ejemplo: `GET http://localhost:3000/usuarios/1`.

Los servicios devuelven mensajes cortos, como “Esto elimina un usuario”. Todavía no hay operaciones reales sobre la base de datos.

## DTOs y validaciones

Se utiliza `class-validator`, `class-transformer` y un `ValidationPipe` global.

- **Usuarios:** nombre, email válido y contraseña fuerte; dirección opcional.
- **Productos:** nombre, descripción, precio positivo con hasta dos decimales y fecha válida no futura.
- **Pedidos:** ID de usuario positivo, arreglo no vacío de IDs de productos positivos sin duplicados y fecha válida no futura; observaciones opcionales.
- **Actualizaciones:** heredan las reglas mediante `PartialType`, con campos opcionales.
- **Auth:** conserva rutas de prueba y DTOs vacíos. Se completará con la profesora.

## Postman

Importar [Weld.postman_collection.json](./Weld.postman_collection.json). Incluye las 24 solicitudes, cuerpos de ejemplo y comprobaciones de respuesta.

Para POST y PUT usar **Body → raw → JSON** con todos los campos obligatorios. PATCH permite enviar campos parciales. GET y DELETE no necesitan Body.

Las pruebas realizadas incluyen solicitudes válidas y datos incorrectos, como omitir un campo obligatorio o enviar texto en lugar de un número. POST válido devuelve **201**, los demás métodos **200** y los errores de validación **400**, con los mensajes en `message`.

## Verificación

```bash
npm run build
npm run test:e2e
```
