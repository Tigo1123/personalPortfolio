import "dotenv/config";
import { createApp } from "./app.js";
const port = Number(process.env.PORT || 3001);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("PORT must be an integer between 1 and 65535");
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  (process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:5173,http://127.0.0.1:5173")
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const server = createApp({ allowedOrigins }).listen(
  port,
  process.env.HOST || "127.0.0.1",
  () => console.log(`Portfolio API listening on port ${port}`),
);
server.on("error", (error) => {
  console.error("Unable to start API:", error.message);
  process.exitCode = 1;
});
function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
