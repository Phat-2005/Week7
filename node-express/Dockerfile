FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

EXPOSE 8000

# Exec form: node is PID 1 and receives the stop signal directly.
# The port is read from process.env.PORT in server.js (Lab 3, Task A — done).
# Only runtime dependencies are installed: eslint is a devDependency and is
# skipped by --omit=dev. Tests and lint run in CI, not in the image.
CMD ["node", "server.js"]
