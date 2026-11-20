#!/usr/bin/env node
// Static server that behaves like Cloudflare/Netlify/Vercel for Lighthouse runs:
// clean URLs (/en → en.html or en/index.html), brotli for text, immutable cache for hashed assets.
// Usage: node cfserve.cjs <static-dir> [port=3007] [hashedAssetPrefix=/_astro/]
const http = require("http"), fs = require("fs"), path = require("path"), zlib = require("zlib");
const root = path.resolve(process.argv[2] || "dist");
const port = Number(process.argv[3] || 3007);
const assetPrefix = process.argv[4] || "/_astro/";
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".ico": "image/x-icon", ".xml": "application/xml", ".txt": "text/plain", ".woff2": "font/woff2",
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(root, urlPath);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    if (fs.existsSync(file + ".html")) file += ".html";
    else if (fs.existsSync(path.join(file, "index.html"))) file = path.join(file, "index.html");
    else { res.writeHead(404); return res.end("not found"); }
  }
  const type = types[path.extname(file)] || "application/octet-stream";
  const headers = { "content-type": type };
  if (urlPath.startsWith(assetPrefix)) headers["cache-control"] = "public, max-age=31536000, immutable";
  const body = fs.readFileSync(file);
  if (/text|javascript|json|svg|xml/.test(type) && /\bbr\b/.test(req.headers["accept-encoding"] || "")) {
    headers["content-encoding"] = "br";
    res.writeHead(200, headers);
    return res.end(zlib.brotliCompressSync(body));
  }
  res.writeHead(200, headers);
  res.end(body);
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
