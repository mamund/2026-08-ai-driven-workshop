const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es'];
const DEFAULT_LANGUAGE = 'en';

const SUPPORTED_FORMATS = ['application/json', 'text/plain'];
const DEFAULT_FORMAT = 'application/json';

const GREETINGS = {
  en: { default: 'Hello, world!', named: (name) => `Hello, ${name}!` },
  de: { default: 'Hallo, Welt!', named: (name) => `Hallo, ${name}!` },
  fr: { default: 'Bonjour, le monde!', named: (name) => `Bonjour, ${name}!` },
  es: { default: '¡Hola, mundo!', named: (name) => `¡Hola, ${name}!` },
};

const ROOT_MESSAGES = {
  en: 'Welcome. Try GET /hello to receive a greeting.',
  de: 'Willkommen. Versuchen Sie GET /hello, um eine Begrüßung zu erhalten.',
  fr: 'Bienvenue. Essayez GET /hello pour recevoir un message de bienvenue.',
  es: 'Bienvenido. Prueba GET /hello para recibir un saludo.',
};

function negotiateLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) return DEFAULT_LANGUAGE;

  const requested = acceptLanguageHeader
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase())
    .map((tag) => tag.split('-')[0]);

  for (const tag of requested) {
    if (SUPPORTED_LANGUAGES.includes(tag)) return tag;
  }
  return DEFAULT_LANGUAGE;
}

function negotiateFormat(acceptHeader) {
  if (!acceptHeader) return DEFAULT_FORMAT;

  const requested = acceptHeader
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase());

  for (const type of requested) {
    if (SUPPORTED_FORMATS.includes(type)) return type;
    if (type === '*/*') return DEFAULT_FORMAT;
  }
  return DEFAULT_FORMAT;
}

function sendResponse(res, status, format, jsonBody, textBody) {
  res.writeHead(status, { 'Content-Type': `${format}; charset=utf-8` });
  if (format === 'text/plain') {
    res.end(textBody);
  } else {
    res.end(JSON.stringify(jsonBody, null, 2));
  }
}

function handleRoot(req, res, format, lang) {
  const message = ROOT_MESSAGES[lang];
  const jsonBody = {
    message,
    links: {
      hello: '/hello',
    },
  };
  const textBody = `${message}\nhello: /hello`;
  sendResponse(res, 200, format, jsonBody, textBody);
}

function handleHello(req, res, format, lang, url) {
  const rawName = url.searchParams.get('name');
  const name = rawName && rawName.trim().length > 0 ? rawName.trim() : null;

  const greeting = name
    ? GREETINGS[lang].named(name)
    : GREETINGS[lang].default;

  const jsonBody = { greeting };
  const textBody = greeting;
  sendResponse(res, 200, format, jsonBody, textBody);
}

function handleNotFound(res, format) {
  const jsonBody = { error: 'Not Found' };
  const textBody = 'Not Found';
  sendResponse(res, 404, format, jsonBody, textBody);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const format = negotiateFormat(req.headers['accept']);
  const lang = negotiateLanguage(req.headers['accept-language']);

  if (url.pathname === '/') {
    handleRoot(req, res, format, lang);
  } else if (url.pathname === '/hello') {
    handleHello(req, res, format, lang, url);
  } else {
    handleNotFound(res, format);
  }
});

server.listen(PORT, () => {
  console.log(`Hello, coach server running at http://localhost:${PORT}`);
});
