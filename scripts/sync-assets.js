import { cp, mkdir } from "node:fs/promises";
// Originals remain at their existing paths; Vite publishes identical copies.
await mkdir("public", { recursive: true });
for (const directory of ["images", "my_certification", "files"]) {
  await cp(directory, `public/${directory}`, { recursive: true });
}
