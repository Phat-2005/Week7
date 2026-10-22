// server.js — production entry point (Dockerfile: CMD ["node", "server.js"]).
//
// End state of Lab 3: the port comes from the environment (Render sets PORT),
// with 8000 as the local default, and the app binds to 0.0.0.0.
const { app, pool } = require("./app");

const PORT = Number(process.env.PORT ?? 8000);

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on 0.0.0.0:${PORT}`);
});

// Exit promptly when the platform stops the container (graceful shutdown).
// Node does not stop on SIGTERM by itself when it runs as PID 1 in a container.
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down");
  server.close(() => pool.end().finally(() => process.exit(0)));
});
