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

async function listFilesRelative(rootPath) {
  async function walk(currentPath, prefix) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      const relativePath = prefix ? path.join(prefix, entry.name) : entry.name;
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        files.push(...await walk(entryPath, relativePath));
        continue;
      }

      if (entry.isFile()) {
        files.push(relativePath);
      }
    }

    return files;
  }

  try {
    return (await walk(rootPath, '')).sort();
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function assertDirectoriesMatch(generatedDir, expectedDir, label) {
  const [generatedFiles, expectedFiles] = await Promise.all([
    listFilesRelative(generatedDir),
    listFilesRelative(expectedDir),
  ]);

  if (generatedFiles.join('\n') !== expectedFiles.join('\n')) {
    throw new Error(`Committed ${label} artifacts are out of date. Run \`npm run build\`.`);
  }

  const generatedBuffers = await Promise.all(
    generatedFiles.map((relativePath) => readFileOrThrow(path.join(generatedDir, relativePath)))
  );
  const expectedBuffers = await Promise.all(
    expectedFiles.map((relativePath) => readFileOrThrow(path.join(expectedDir, relativePath)))
  );

  for (let index = 0; index < generatedFiles.length; index += 1) {
    if (!generatedBuffers[index].equals(expectedBuffers[index])) {
      throw new Error(`Committed ${label} artifacts are out of date. Run \`npm run build\`.`);
    }
  }
}

async function main() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'syncdeck-build-check-'));

  try {
    const generated = await buildRuntime({ outDir: tempDir });
    const expected = {
      jsFile: path.resolve(rootDir, 'dist/syncdeck-reveal.js'),
      cssFile: path.resolve(rootDir, 'dist/syncdeck-reveal.css'),
      assetsDir: path.resolve(rootDir, 'dist/assets'),
    };

    const [generatedJs, expectedJs, generatedCss, expectedCss] = await Promise.all([
      readFileOrThrow(generated.jsFile),
      readFileOrThrow(expected.jsFile),
      readFileOrThrow(generated.cssFile),
      readFileOrThrow(expected.cssFile),
    ]);

    if (!generatedJs.equals(expectedJs) || !generatedCss.equals(expectedCss)) {
      throw new Error('Committed dist artifacts are out of date. Run `npm run build`.');
    }

    await assertDirectoriesMatch(
      path.join(generated.outDir, 'assets'),
      expected.assetsDir,
      'dist/assets'
    );
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

await main();
