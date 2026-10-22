72ITDS30103 · Week 7 · Session 14 starter — "catch-up" starter for teams that did not finish Lab 3 or Lab 4

Use this ONLY if, before Session 14, your team does not yet have ALL of the following:
  - a live Render web service built from your Dockerfile (Lab 3),
  - a fast /health endpoint and a /health/db endpoint,
  - .github/workflows/ci-cd.yml with a lint + test "check" job and a "deploy" job (Lab 4),
  - "check" as a required status check on main, and the RENDER_DEPLOY_HOOK secret.
If you already have those in your own project, KEEP YOUR OWN PROJECT. Session 14 is about
moving the database to Supabase, not about rewriting your application.

Pick ONE folder, the language your team uses:
  python-fastapi/   Python + FastAPI   (matches the code in the Session 14 handout)
  node-express/     Node.js + Express  (handout Appendix A shows the Node.js steps)

What is already done (= the end of Lab 4):
  Dockerfile reads PORT · binds 0.0.0.0 · /, /health, /health/db · compose.yml for the local
  stack · 2 real tests · a configured linter · .github/workflows/ci-cd.yml (check + deploy)
  · .gitignore covers .env AND .env.cloud · no secret in the repository · version 1.2.0.

What Session 14 still asks you to do (all of it):
  Task A  create the Supabase project
  Task B  write db/schema.sql + db/seed.sql and run them in Supabase
  Task C  point DATABASE_URL at Supabase — locally, then on Render — without changing code
  Task D  connection resilience: a small, self-healing pool (this IS a code change)
  Task E  pause the project, read the error, restore it

What this starter can NOT do for you (handout Appendix B walks you through each one):
  - create your Render web service (≈ 15 min),
  - make "check" required, add the RENDER_DEPLOY_HOOK secret, turn Render Auto-Deploy off
    (repository admin + Render owner, ≈ 10 min).

Both apps listen on port 8000 inside the container; compose maps it to localhost:3000.
