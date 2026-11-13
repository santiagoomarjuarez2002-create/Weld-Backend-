# Weld Backend

API REST de Weld desarrollada con NestJS y TypeScript. Incluye Usuarios, Productos, Pedidos y Auth, y las validaciones del **TP 10: DTO y validación de datos en NestJS**.

## Estado del proyecto

- Usuarios, Productos y Pedidos tienen DTOs propios de creación con validaciones y mensajes en español.
- Los DTOs de actualización heredan las reglas mediante `PartialType`, con campos opcionales.
- `main.ts` registra un `ValidationPipe` global.
- Los servicios devuelven mensajes cortos, como “Esto crea un usuario”. Todavía no guardan, consultan ni eliminan datos reales.
- Auth conserva las rutas de prueba y DTOs vacíos. Sus campos, validaciones y autenticación se trabajarán con la profesora.
- Se realizaron pruebas en Postman con solicitudes válidas e inválidas.

## Instalación y ejecución

Requisitos: Node.js compatible con las dependencias y npm.

Desde la carpeta `Weld-Backend-`, donde está `package.json`:

```bash
npm install
npm run start:dev
```

La aplicación escucha en **http://localhost:3000** por defecto. Usa `process.env.PORT` si esa variable está definida en el proceso.

Actualmente no se carga automáticamente un archivo `.env`. Para cambiar el puerto desde PowerShell:

```powershell
$env:PORT = '4001'
npm run start:dev
```

Las variables `VITE_API_*` son direcciones que puede utilizar el frontend; no configuran el puerto del backend. Postman tampoco las importa automáticamente desde el `.env`.

## Estructura principal

```text
src/
|-- main.ts
`-- modules/
    |-- App/
    |-- auth/
    |-- pedidos/
    |-- productos/
    |-- usuarios/
    `-- ejercicios.ts
```

Cada recurso tiene su controlador, servicio, módulo, carpeta `dto` y carpeta `entities`. No hay prefijo global en las rutas.

## Endpoints

| Módulo | URL base |
| --- | --- |
| Usuarios | `http://localhost:3000/usuarios` |
| Productos | `http://localhost:3000/productos` |
| Pedidos | `http://localhost:3000/pedidos` |
| Auth | `http://localhost:3000/auth` |

Todos tienen las siguientes rutas. Reemplazar `recurso` por `usuarios`, `productos`, `pedidos` o `auth`:

| Método | Ruta | Operación | Ejemplo de respuesta en Usuarios |
| --- | --- | --- | --- |
| GET | `/recurso` | findAll | Esto muestra los usuarios |
| GET | `/recurso/1` | findOne | Esto muestra un usuario |
| POST | `/recurso` | create | Esto crea un usuario |
| PUT | `/recurso/1` | replace | Esto reemplaza un usuario |
| PATCH | `/recurso/1` | update | Esto actualiza parcialmente un usuario |
| DELETE | `/recurso/1` | remove | Esto elimina un usuario |

El ID `1` es un ejemplo. Las rutas actuales no verifican su existencia en una base de datos. Auth también devuelve únicamente mensajes; no implementa login.

`GET /` devuelve `Hola Programacion`.

## Probar en Postman

Elegir el método y pegar la URL completa. GET y DELETE no necesitan Body.

Para **POST y PUT**, seleccionar **Body → raw → JSON** y enviar todos los campos obligatorios del recurso. PUT requiere un ID al final de la URL, por ejemplo `http://localhost:3000/usuarios/1`.

### Usuarios

POST: `http://localhost:3000/usuarios`

PUT: `http://localhost:3000/usuarios/1`

```json
{
  "nombre": "Joaquin",
  "email": "joaquin@example.com",
  "password": "Clave123!"
}
```

Validaciones: nombre de 3 a 100 caracteres, email válido de hasta 254 caracteres y contraseña de 8 a 128 caracteres con minúscula, mayúscula, número y símbolo. `direccion` es opcional y debe tener entre 5 y 255 caracteres.

### Productos

POST: `http://localhost:3000/productos`

PUT: `http://localhost:3000/productos/1`

```json
{
  "nombre": "Soldadora",
  "descripcion": "Soldadora para uso industrial",
  "precio": 125.50,
  "fecha": "2020-01-01T00:00:00.000Z"
}
```

Validaciones: nombre de 3 a 100 caracteres, descripción de 15 a 255, precio numérico positivo con hasta 2 decimales y fecha válida que no sea futura. La fecha se convierte mediante `@Type(() => Date)`.

### Pedidos

POST: `http://localhost:3000/pedidos`

PUT: `http://localhost:3000/pedidos/1`

```json
{
  "usuarioId": 1,
  "productosIds": [1, 2],
  "fecha": "2020-01-01T00:00:00.000Z"
}
```

Validaciones: `usuarioId` entero positivo, `productosIds` como arreglo no vacío de enteros positivos sin duplicados y fecha válida que no sea futura. `observaciones` es opcional, de tipo texto y con hasta 500 caracteres.

### PATCH y Auth

PATCH permite enviar campos parciales en **Body → raw → JSON**. Por ejemplo, para `PATCH http://localhost:3000/productos/1`:

```json
{
  "precio": 150.75
}
```

Para las rutas POST, PUT y PATCH de Auth, enviar `{}` mientras sus DTOs estén vacíos.

### Comprobar los errores de validación

1. Enviar un POST con el cuerpo válido del recurso: debe responder **201 Created** y el mensaje correspondiente.
2. Cambiar un solo dato y volver a enviar.
3. Comprobar la respuesta **400 Bad Request** y los errores del arreglo `message`.
4. Corregir el dato y comprobar que vuelve a responder **201**.

Ejemplos de errores:

| Recurso | Cambio | Validación |
| --- | --- | --- |
| Usuarios | Omitir `email` | Correo obligatorio y válido |
| Usuarios | Enviar `"password": "123"` | Contraseña fuerte |
| Productos | Omitir `precio` | Precio obligatorio |
| Productos | Enviar `"precio": "hola"` | Tipo numérico |
| Productos | Enviar `"precio": -10` | Precio positivo |
| Pedidos | Enviar `"usuarioId": "hola"` | Entero positivo |
| Pedidos | Enviar `"productosIds": []` | Arreglo no vacío |
| Pedidos | Enviar `"productosIds": [1, 1]` | Identificadores únicos |

Puede aparecer más de un mensaje por campo inválido. Los DTOs actuales no contienen un campo `estado`; la validación de booleanos es un ejemplo de la consigna.

Las solicitudes válidas GET, PUT, PATCH y DELETE responden **200 OK**.

### Colección lista para importar

En Postman, seleccionar **Import** y abrir [Weld.postman_collection.json](./Weld.postman_collection.json).

Incluye las 24 solicitudes de los cuatro módulos, cuerpos de ejemplo y comprobaciones de estado y mensaje. Utiliza `baseUrl=http://localhost:3000` e `id=1` como variables de colección.

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

- `main`: versión estable.
- `dev`: integración.
- `feature/nombre-funcionalidad`: funcionalidades.
- `fix/nombre-correccion`: correcciones.
- `refactor/nombre-cambio`: reorganización.
- `docs/nombre-documentacion`: documentación.

## Integrantes

Joaquin Bernardo
Santiago Juarez
Santiago Acosta
Leonel Ferrari