import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
};

function contentTypeFor(filePath) {
  return MIME_TYPES[path.extname(filePath)] || 'application/octet-stream';
}

export async function startStaticServer(rootDir) {
  const rootPath = path.resolve(rootDir);

  const server = http.createServer(async (req, res) => {
    const method = req.method || 'GET';
    if (method !== 'GET' && method !== 'HEAD') {
      res.writeHead(405, {
        'allow': 'GET, HEAD',
        'content-type': 'text/plain; charset=utf-8',
      });
      res.end('Method not allowed');
      return;
    }

    const reqPath = new URL(req.url, 'http://127.0.0.1').pathname;
    let relativePath;

    try {
      relativePath = decodeURIComponent(reqPath.replace(/^\/+/, ''));
    } catch {
      res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Bad request');
      return;
    }

    const filePath = path.resolve(rootPath, relativePath);
    const relativeFromRoot = path.relative(rootPath, filePath);
    const escapedRoot = relativeFromRoot === '..' || relativeFromRoot.startsWith(`..${path.sep}`);

    if (escapedRoot || path.isAbsolute(relativeFromRoot)) {
      res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    try {
      if (method === 'HEAD') {
        const info = await stat(filePath);
        if (!info.isFile()) throw new Error('Not a file');
        res.writeHead(200, {
          'content-type': contentTypeFor(filePath),
          'content-length': String(info.size),
        });
        res.end();
        return;
      }

      const contents = await readFile(filePath);
      res.writeHead(200, { 'content-type': contentTypeFor(filePath) });
      res.end(contents);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
  });

  await new Promise((resolve, reject) => {
    const onError = (error) => {
      server.off('error', onError);
      reject(error);
    };

    server.once('error', onError);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', onError);
      resolve();
    });
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to determine static server address');
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    }),
  };
}
