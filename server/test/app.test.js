import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
test("health, CORS, missing routes, and invalid JSON", async (t) => {
  const server = createApp({
    allowedOrigins: ["https://portfolio.example"],
  }).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const health = await fetch(`${base}/api/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok" });
  assert.equal(health.headers.get("x-powered-by"), null);
  const allowed = await fetch(`${base}/api/health`, {
    headers: { Origin: "https://portfolio.example" },
  });
  assert.equal(
    allowed.headers.get("access-control-allow-origin"),
    "https://portfolio.example",
  );
  const denied = await fetch(`${base}/api/health`, {
    headers: { Origin: "https://untrusted.example" },
  });
  assert.equal(denied.status, 403);
  assert.equal(denied.headers.get("access-control-allow-origin"), null);
  const missing = await fetch(`${base}/api/missing`);
  assert.equal(missing.status, 404);
  assert.deepEqual(await missing.json(), { error: "Not found" });
  const invalid = await fetch(`${base}/api/health`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal(invalid.status, 400);
  assert.deepEqual(await invalid.json(), { error: "Invalid JSON" });
});
