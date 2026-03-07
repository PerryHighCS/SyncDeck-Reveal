import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildRuntime } from './build-runtime.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function readFileOrThrow(filePath) {
  try {
    return await fs.readFile(filePath);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      throw new Error(`Missing expected build artifact: ${path.relative(rootDir, filePath)}`);
    }
    throw error;
  }
}

async function main() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'syncdeck-build-check-'));

  try {
    const generated = await buildRuntime({ outDir: tempDir });
    const expected = {
      jsFile: path.resolve(rootDir, 'dist/syncdeck-reveal.js'),
      cssFile: path.resolve(rootDir, 'dist/syncdeck-reveal.css'),
    };

    const [generatedJs, expectedJs, generatedCss, expectedCss] = await Promise.all([
      readFileOrThrow(generated.jsFile),
      readFileOrThrow(expected.jsFile),
      readFileOrThrow(generated.cssFile),
      readFileOrThrow(expected.cssFile),
    ]);

    if (!generatedJs.equals(expectedJs) || !generatedCss.equals(expectedCss)) {
      throw new Error('Committed dist artifacts are out of date. Run npm run build in vendor/SyncDeck-Reveal/js.');
    }
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

await main();
