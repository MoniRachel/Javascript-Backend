import { pathToFileURL } from 'node:url';

const [, , method = '', resource = '', ...extraArgs] = process.argv;

const API_URL = 'https://fakestoreapi.com';
const VALID_METHODS = ['GET', 'POST', 'DELETE'];

const printUsage = () => {
  console.log('Uso: npm run start <METHOD> <resource> [args...]');
  console.log('Ejemplos:');
  console.log('  npm run start GET products');
  console.log('  npm run start GET products/15');
  console.log('  npm run start POST products T-Shirt-Rex 300 remeras');
  console.log('  npm run start DELETE products/7');
};

const validateMethod = (value) => {
  const normalized = value.toUpperCase();

  if (!VALID_METHODS.includes(normalized)) {
    throw new Error(`Método inválido: "${value}". Usa GET, POST o DELETE.`);
  }

  return normalized;
};

const validateResource = (value) => {
  const isValid = /^products(?:\/\d+)?$/.test(value);

  if (!isValid) {
    throw new Error(`Ruta inválida: "${value}". Debe ser "products" o "products/<id>".`);
  }

  return value;
};

const request = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status} ${response.statusText}.`);
  }

  return response.json();
};

const buildProductBody = (args) => {
  if (args.length < 3) {
    throw new Error('Para crear un producto debes enviar: <title> <price> <category>.');
  }

  const [categoryValue, priceValue, ...titleParts] = [...args].reverse();
  const title = titleParts.reverse().join(' ').trim();
  const parsedPrice = Number(priceValue);

  if (!title) {
    throw new Error('El título del producto no puede estar vacío.');
  }

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    throw new Error(`El precio "${priceValue}" no es válido.`);
  }

  if (!categoryValue || !categoryValue.trim()) {
    throw new Error('La categoría del producto no puede estar vacía.');
  }

  return {
    title,
    price: parsedPrice,
    category: categoryValue.trim(),
  };
};

export const runCli = async () => {
  if (!method || !resource) {
    printUsage();
    process.exit(1);
  }

  try {
    const normalizedMethod = validateMethod(method);
    const normalizedResource = validateResource(resource);
    const endpoint = `${API_URL}/${normalizedResource}`;

    switch (normalizedMethod) {
      case 'GET': {
        const result = await request(endpoint);
        console.log(result);
        break;
      }

      case 'POST': {
        const productBody = buildProductBody(extraArgs);
        const result = await request(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productBody),
        });
        console.log(result);
        break;
      }

      case 'DELETE': {
        const result = await request(endpoint, { method: 'DELETE' });
        console.log(result);
        break;
      }

      default:
        throw new Error(`Método no soportado: ${method}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printUsage();
    process.exit(1);
  }
};

const isDirectExecution = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
  runCli();
}
