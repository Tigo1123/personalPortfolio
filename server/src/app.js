import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.js";
import { notFound, errorHandler } from "./middleware/errors.js";
export function createApp({ allowedOrigins = [] } = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin))
          return callback(null, true);
        const error = new Error("Origin not allowed");
        error.status = 403;
        callback(error);
      },
    }),
  );
  app.use(express.json({ limit: "16kb" }));
  app.use("/api", healthRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
