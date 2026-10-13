# Proyecto Backend con Node.js y Fake Store API

Este proyecto es una pequeña aplicación backend en Node.js que permite interactuar con la API pública de Fake Store usando comandos por línea.

## Tecnologías usadas

- Node.js
- npm
- JavaScript ESModules
- Fetch API
- Fake Store API

## Requisitos

- Tener Node.js instalado
- Tener npm disponible
- Conexión a internet para consultar la API de Fake Store

## Configuración inicial

El proyecto ya fue inicializado con:

```bash
npm init -y
```

Y se habilitó ESModules agregando en el archivo `package.json`:

```json
"type": "module"
```

También se configuró el script principal:

```json
"scripts": {
  "start": "node index.js"
}
```

## Cómo ejecutar el proyecto

```bash
npm run start <METHOD> <resource> [args...]
```

### Métodos soportados

- GET
- POST
- DELETE

## Uso del backend

### 1. Consultar todos los productos

```bash
npm run start GET products
```

Este comando realiza una petición asíncrona a la API y devuelve la lista completa de productos en la consola.

### 2. Consultar un producto específico

```bash
npm run start GET products/15
```

Devuelve el producto cuyo `id` sea `15`.

### 3. Crear un producto nuevo

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

Esto envia un `POST` con este cuerpo:

```json
{
  "title": "T-Shirt-Rex",
  "price": 300,
  "category": "remeras"
}
```

### 4. Eliminar un producto

```bash
npm run start DELETE products/7
```

Este comando elimina el producto con `id` `7`.

## Cómo funciona internamente

El archivo `index.js` usa:

- `process.argv` para leer los argumentos enviados desde la terminal
- `fetch` para hacer peticiones HTTP a la Fake Store API
- `async/await` para trabajar con peticiones asíncronas
- destructuring y spread para manipular los datos recibidos

## Visualización de la funcionalidad del backend

Aunque este proyecto es backend, su funcionalidad puede visualizarse desde la terminal porque la API responde en consola. Por ejemplo, al ejecutar:

```bash
npm run start GET products
```

se muestran los datos JSON completos de los productos en la terminal.

También se puede observar el comportamiento de la aplicación con:

- solicitudes `GET` para lectura
- `POST` para creación
- `DELETE` para eliminación

Esto permite verificar de forma directa si el backend está funcionando correctamente.

## Herramientas y tecnologías para visualizar el backend

Si quieres una mejor visualización o una interfaz para probar el backend, puedes usar:

- Terminal de VS Code
- Postman
- Insomnia
- Thunder Client (extensión de VS Code)
- Navegador con herramientas de desarrollo

Estas herramientas permiten probar endpoints, inspeccionar respuestas JSON y verificar errores.

## Recomendaciones

- Usa la terminal para pruebas rápidas
- Revisa la salida JSON en consola
- Si hay errores, verifica el método HTTP y la ruta usada
- Revisa siempre el valor de `process.argv` para confirmar que los argumentos se están enviando correctamente

## Enlace útil

- Documentación de Fake Store API: https://fakestoreapi.com/docs

## Ejemplo completo

```bash
npm run start GET products
npm run start GET products/15
npm run start POST products T-Shirt-Rex 300 remeras
npm run start DELETE products/7
```
