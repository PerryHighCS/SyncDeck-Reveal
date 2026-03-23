import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { rollup } from 'rollup';

import { createRollupConfig } from '../rollup.config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function parseOutDir(argv) {
  const outDirIndex = argv.indexOf('--out-dir');
  if (outDirIndex === -1) {
    return path.resolve(rootDir, 'dist');
  }

  const outDirValue = argv[outDirIndex + 1];
  if (!outDirValue) {
    throw new Error('--out-dir requires a value');
  }

  return path.resolve(rootDir, outDirValue);
}

async function copyDirectory(sourceDir, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    if (entry.isFile()) {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

export async function buildRuntime(options = {}) {
  const outDir = path.resolve(rootDir, options.outDir || 'dist');
  await fs.mkdir(outDir, { recursive: true });

  const config = createRollupConfig({ outDir });
  const bundle = await rollup(config);

  try {
    await bundle.write(config.output);
  } finally {
    await bundle.close();
  }

  const assetsDir = path.join(rootDir, 'assets');
  try {
    await copyDirectory(assetsDir, path.join(outDir, 'assets'));
  } catch (error) {
    if (error && error.code !== 'ENOENT') {
      throw error;
    }
  }

  return {
    outDir,
    jsFile: path.join(outDir, 'syncdeck-reveal.js'),
    cssFile: path.join(outDir, 'syncdeck-reveal.css'),
  };
}

const invokedAsScript = process.argv[1] === fileURLToPath(import.meta.url);

if (invokedAsScript) {
  await buildRuntime({
    outDir: parseOutDir(process.argv.slice(2)),
  });
}
