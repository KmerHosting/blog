import http from 'node:http';
import { spawn } from 'node:child_process';

const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'application/json');
  if (request.url === '/api/public-articles') {
    response.end(JSON.stringify({ data: [] }));
    return;
  }
  response.statusCode = 404;
  response.end(JSON.stringify({ data: null }));
});

await new Promise((resolve) => server.listen(1337, '127.0.0.1', resolve));

const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, STRAPI_INTERNAL_URL: 'http://127.0.0.1:1337' },
});

const exitCode = await new Promise((resolve) => child.on('exit', (code) => resolve(code ?? 1)));
await new Promise((resolve) => server.close(resolve));
process.exit(exitCode);
