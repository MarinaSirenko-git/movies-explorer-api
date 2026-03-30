const dotenv = require('dotenv');

dotenv.config();

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://movies-explorer-frontend.pages.dev',
];

function parseAllowedOrigins(raw) {
  if (!raw || !String(raw).trim()) {
    return DEFAULT_ALLOWED_ORIGINS;
  }
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

const { 
  PORT = 3001, 
  MONGODB_URI, 
  SECRET_KEY = 'super-strong-secret',
  ALLOWED_ORIGINS: ALLOWED_ORIGINS_RAW,
} = process.env;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined');
  process.exit(1);
}

const ALLOWED_ORIGINS = parseAllowedOrigins(ALLOWED_ORIGINS_RAW);

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET_KEY,
  ALLOWED_ORIGINS,
};
