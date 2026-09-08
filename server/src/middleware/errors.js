export function notFound(_req, res) {
  res.status(404).json({ error: "Not found" });
}
export function errorHandler(error, _req, res, _next) {
  const status = error.status >= 400 && error.status < 600 ? error.status : 500;
  if (status >= 500) console.error(error);
  res.status(status).json({
    error:
      status >= 500
        ? "Internal server error"
        : error.type === "entity.parse.failed"
          ? "Invalid JSON"
          : error.message,
  });
}
