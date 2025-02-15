import dotenv from 'dotenv';
import path from 'node:path';

export function getDotEnv(
  key: string,
  defaultValue: string | number | boolean = false
): string | number | boolean {
  const env = process.env[key];
  if (!env) {
    return defaultValue;
  }
  if (env.toLowerCase() === 'true') {
    return true;
  }
  if (env.toLowerCase() === 'false') {
    return false;
  }
  if (!Number.isNaN(+env)) {
    return +env;
  }
  return env;
}

export function initEnv() {
  return dotenv.config({
    path: path.resolve(__dirname, '../../env/.env.local'),
    encoding: 'utf8',
    debug: getDotEnv(process.env.DEBUG as string) as boolean,
  });
}

initEnv();
