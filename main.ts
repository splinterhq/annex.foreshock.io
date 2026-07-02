import { serveDir } from "@std/http/file-server";

// Serve everything under public/ as static files. Directory requests
// (including "/") resolve to index.html. Downloadable artifacts live under
// public/bin/ and are served at their matching path.
Deno.serve((req) =>
  serveDir(req, {
    fsRoot: "public",
    quiet: true,
  })
);
