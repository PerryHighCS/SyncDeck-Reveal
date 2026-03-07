import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = __dirname;

export function createRollupConfig(options = {}) {
  const outDir = path.resolve(rootDir, options.outDir || 'dist');
  const jsOutFile = path.join(outDir, 'syncdeck-reveal.js');
  const cssOutFile = path.join(outDir, 'syncdeck-reveal.css');

  return {
    input: path.resolve(rootDir, 'src/syncdeck-runtime.js'),
    plugins: [
      nodeResolve({
        browser: true,
      }),
      postcss({
        extract: cssOutFile,
      }),
    ],
    output: {
      file: jsOutFile,
      format: 'iife',
      name: 'SyncDeckRevealRuntime',
    },
  };
}
