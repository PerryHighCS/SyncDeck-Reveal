import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPackageJson = require.resolve('playwright/package.json');
const playwrightCli = path.join(path.dirname(playwrightPackageJson), 'cli.js');
const cliArgs = [process.execPath, playwrightCli, 'test', ...process.argv.slice(2)];

const child = process.platform === 'win32'
  ? spawn(cliArgs[0], cliArgs.slice(1), { stdio: 'inherit' })
  : spawn('sh', ['-lc', 'ulimit -c 0; exec "$@"', 'sh', ...cliArgs], { stdio: 'inherit' });

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});

child.on('error', (error) => {
  console.error('[run-playwright] Failed to launch Playwright:', error);
  process.exit(1);
});
