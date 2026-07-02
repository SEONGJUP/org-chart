import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = normalize(join(dirname(fileURLToPath(import.meta.url)), ".."));
const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || "0.0.0.0";
const appDir = join(root, ".next", "server", "app");

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

function isFile(filePath) {
  try {
    return existsSync(filePath) && statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function resolveFile(urlPath = "/") {
  let cleanPath = "/";
  try {
    cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  } catch {
    cleanPath = "";
  }

  if (cleanPath === "" || cleanPath === "index") {
    return join(appDir, "index.html");
  }

  if (cleanPath === "__health") {
    return "__health";
  }

  if (cleanPath === "favicon.ico") {
    return join(appDir, "favicon.ico.body");
  }

  if (cleanPath.startsWith("_next/static/")) {
    return safeJoin(join(root, ".next", "static"), cleanPath.replace("_next/static/", ""));
  }

  const publicFile = safeJoin(join(root, "public"), cleanPath);
  if (publicFile && isFile(publicFile)) {
    return publicFile;
  }

  const routeName = cleanPath.replace(/\/$/, "").replace(/\//g, "-");
  return join(appDir, `${routeName}.html`);
}

const server = createServer((req, res) => {
  const filePath = resolveFile(req.url || "/");

  if (filePath === "__health") {
    res.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    res.end(JSON.stringify({ ok: true, root, appDir }));
    return;
  }

  if (!filePath || !isFile(filePath)) {
    const notFound = join(appDir, "_not-found.html");
    res.writeHead(404, { "content-type": contentTypes[".html"] });
    if (isFile(notFound)) {
      createReadStream(notFound).pipe(res);
    } else {
      res.end("Not found. Run `npm run build` before `npm run preview:static`.");
    }
    return;
  }

  const ext = filePath.endsWith("favicon.ico.body") ? ".ico" : extname(filePath);
  res.writeHead(200, {
    "content-type": contentTypes[ext] || "application/octet-stream",
    "cache-control": "no-store",
  });
  createReadStream(filePath)
    .on("error", () => {
      if (!res.headersSent) {
        res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      }
      res.end("Failed to read file.");
    })
    .pipe(res);
});

server.on("error", (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`SafeBuddy static preview: http://localhost:${port}/half-year-inspection`);
});
