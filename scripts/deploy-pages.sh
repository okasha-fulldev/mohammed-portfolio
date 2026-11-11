#!/usr/bin/env bash
# Builds the static site and publishes it to the gh-pages branch (GitHub Pages serves that branch).
# Usage: npm run deploy:pages   (stop `npm run dev` first on Windows: it locks files)
set -euo pipefail
cd "$(dirname "$0")/.."
REPO_NAME="mohammed-portfolio"
export MSYS_NO_PATHCONV=1
export GITHUB_PAGES=true
export NEXT_PUBLIC_BASE_PATH="/$REPO_NAME"
export NEXT_PUBLIC_SITE_URL="https://okasha-fulldev.github.io/$REPO_NAME"
export NEXT_PUBLIC_FORM_ENDPOINT="https://formsubmit.co/ajax/mohammed.masud460@gmail.com"

# put the server-only files back from git when done, even if the build fails
restore() { git checkout -- src/app/api src/app/sitemap.ts src/app/robots.ts; rm -f public/sitemap.xml public/robots.txt; }
trap restore EXIT

# server-only routes can't be exported; sitemap/robots become plain files
rm -rf src/app/api src/app/sitemap.ts src/app/robots.ts .next out
node scripts/prepare-pages.mjs
npx next build
touch out/.nojekyll

REMOTE="$(git remote get-url origin)"
cd out
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
git push -q -f "$REMOTE" gh-pages
echo "Published: $NEXT_PUBLIC_SITE_URL/"
