// test/health.test.js — the real tests the Lab 4 pipeline runs on every pull request.
// Runs with Node's built-in test runner:  npm test   (= node --test)
//
// Lab 4, Task D: make ONE of these fail on purpose (e.g. change 200 to 201),
// push it on a branch, and show the red check blocking the merge.
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");

// app.js throws at import if DATABASE_URL is missing. The CI runner has no
// database and no .env, so give it a harmless dummy value BEFORE requiring it.
// These tests never open a database connection.
process.env.DATABASE_URL ??= "postgresql://unused@localhost/none";
process.env.APP_ENV ??= "test";
const { app, pool, APP_VERSION } = require("../app");

let server;
let base;

before(async () => {
  // Port 0 = "any free port": tests never collide with a running dev server.
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await pool.end();
});

test("GET /health returns 200 and status ok", async () => {
  const r = await fetch(`${base}/health`);
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { status: "ok" });
});

test("GET / reports the app name and version", async () => {
  const r = await fetch(`${base}/`);
  assert.equal(r.status, 200);
  const body = await r.json();
  assert.equal(body.app, "notes");
  assert.equal(body.version, APP_VERSION);
});
