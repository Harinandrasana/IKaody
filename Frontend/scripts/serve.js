// Reads PORT from .env (falling back to the Angular CLI default) and launches `ng serve`.
// No dependency on dotenv/cross-env: this is a tiny prototype and .env only ever holds one value.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const DEFAULT_PORT = '4200';

function readPortFromEnv() {
  const envPath = path.resolve(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    return process.env.PORT || DEFAULT_PORT;
  }

  const line = fs
    .readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .find((l) => /^PORT\s*=/.test(l));

  if (!line) {
    return process.env.PORT || DEFAULT_PORT;
  }

  return line.split('=')[1].trim();
}

const port = readPortFromEnv();
const result = spawnSync('ng', ['serve', '--port', port], { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
