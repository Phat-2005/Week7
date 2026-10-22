# Notes app — Session 14 starting point (Node.js + Express)

This is the end state of **Lab 4**: the Lab 3 app, two tests, a linter and the finished
CI/CD workflow. Use it only if your team did not finish Lab 3 or Lab 4.

It is the starting point for Session 14, **not** a solution to it: there is no
`db/schema.sql`, no `db/seed.sql`, and the `Pool` in `app.js` still has the Lab 4 settings
that Task D replaces. (Without Task D, this app **crashes** when the database restarts or
pauses — Task D shows why and fixes it.)

## What is in the folder

| File | Purpose |
|------|---------|
| `app.js` | The Express app (`/`, `/health`, `/health/db`), exported, no `listen()` |
| `server.js` | Entry point: reads `PORT`, binds `0.0.0.0`, handles `SIGTERM` |
| `test/health.test.js` | Two real tests with `node --test` |
| `eslint.config.js`, `package.json`, `package-lock.json` | Lint + test scripts; lock file committed |
| `.github/workflows/ci-cd.yml` | Lab 4 pipeline: `check` (lint + test) then `deploy` (Render hook) |
| `compose.yml`, `db/init.sql` | Local stack with its own PostgreSQL (Session 14, Task B3 changes this) |
| `.env.example` | Lists `DB_PASSWORD` (for `.env`) and `DATABASE_URL` (for `.env.cloud`) |

## 1. Put it in your team repository

Copy every file in this folder into the **root** of your team repository — including the
hidden files and folders `.github/`, `.dockerignore`, `.gitignore`, `.env.example`.
Do **not** copy a `node_modules/` folder. In Git Bash:

    cp -r node-express/. /c/path/to/your-repo/       # the "/." copies hidden files too
    cd /c/path/to/your-repo
    git switch -c week7-starter
    git add .
    git commit -m "Session 14: start from the Week 7 starter"
    git push -u origin week7-starter
    # open a pull request on GitHub; the "check" job runs; merge it when green

## 2. Check it works on your machine — Node 22 or newer

    npm ci
    npm run lint           # expect: no output
    npm test               # expect: # pass 2   # fail 0

    cp .env.example .env   # then put any password after DB_PASSWORD=
    podman compose up -d --build
    curl -s http://localhost:3000/health/db     # {"db":"ok","notes":1}
    podman compose down

## 3. Render and GitHub settings (if you have no live service yet)

Follow **Appendix B** of the Session 14 handout.

## 4. Then follow the Session 14 handout — Appendix A has the Node.js steps

| Handout (Python) | Node.js equivalent |
|------------------|--------------------|
| Task D: replace `app/main.py` | Task D: replace the `Pool` block in `app.js` (Appendix A) |
| `psycopg[binary,pool]` | nothing to install — `pg` already has a pool |
| `APP_VERSION` in `app/main.py` | `APP_VERSION` in `app.js` |

Never commit `.env` or `.env.cloud`. Both are already listed in `.gitignore` and `.dockerignore`.
