# CLAUDE.md

template-node-package: __DESCRIPTION__

Plain ESM JavaScript, no build step. Logic lives in `src/`; `bin/` only parses
arguments and prints. Tests use `node:test`.

## Commands

```bash
npm test
npm run pack:check        # npm pack ships required files and nothing forbidden
scripts/version-sync.sh   # package.json == package-lock.json
```

Pre-commit enforces Conventional Commits; commit types set the release version.
List every shipped path in `package.json` `files`.

## Releases

Run the **Prepare release** workflow on `main` (tick `dry_run` to preview).
It computes the next version with git-cliff, bumps `package.json` and
`package-lock.json`, tags `vX.Y.Z` and dispatches `release.yml`, which tests,
packs, publishes to npm when `PUBLISH_NPM=true` and creates the GitHub release
with the tarball. Never bump the version by hand.
