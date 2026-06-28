import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = normalize(join(fileURLToPath(import.meta.url), "..", ".."));
const port = Number(process.env.PORT || 3001);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function safeJoin(base, requestPath) {
  const resolved = normalize(join(base, requestPath));
  return resolved.startsWith(normalize(base)) ? resolved : null;
}

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");

  if (cleanPath === "" || cleanPath === "index") {
    return join(root, ".next", "server", "app", "index.html");
  }

  if (cleanPath === "favicon.ico") {
    return join(root, ".next", "server", "app", "favicon.ico.body");
  }

  if (cleanPath.startsWith("_next/static/")) {
    return safeJoin(join(root, ".next", "static"), cleanPath.replace("_next/static/", ""));
  }

  const publicFile = safeJoin(join(root, "public"), cleanPath);
  if (publicFile && existsSync(publicFile) && statSync(publicFile).isFile()) {
    return publicFile;
  }

  const routeName = cleanPath.replace(/\/$/, "").replace(/\//g, "-");
  return join(root, ".next", "server", "app", `${routeName}.html`);
}

const server = createServer((req, res) => {
  const filePath = resolveFile(req.url || "/");

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    const notFound = join(root, ".next", "server", "app", "_not-found.html");
    res.writeHead(404, { "content-type": contentTypes[".html"] });
    createReadStream(notFound).pipe(res);
    return;
  }

  const ext = filePath.endsWith("favicon.ico.body") ? ".ico" : extname(filePath);
  res.writeHead(200, {
    "content-type": contentTypes[ext] || "application/octet-stream",
    "cache-control": "no-store",
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, "::", () => {
  console.log(`SafeBuddy static preview: http://localhost:${port}/half-year-inspection`);
});
