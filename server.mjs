// Servidor local simples para abrir a PWA em http://localhost:4173.
// Ele só entrega arquivos; ainda não existe API, banco de dados ou login real.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectFolder = resolve(fileURLToPath(new URL(".", import.meta.url)));
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = resolve(projectFolder, relativePath);
  if (filePath !== projectFolder && !filePath.startsWith(projectFolder + sep)) {
    response.writeHead(403).end("Acesso negado");
    return;
  }

  try {
    const content = await readFile(filePath);
    response.writeHead(200, { "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream" });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Arquivo não encontrado");
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("BELLATRIX aberto em http://localhost:4173");
});
