#!/usr/bin/env bash
# Prints scripts/cv/cv.html to public/cv/Mohammed_Masoud_CV.pdf with headless Chrome.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
SRC="$(cygpath -w "$ROOT/scripts/cv/cv.html" 2>/dev/null || echo "$ROOT/scripts/cv/cv.html")"
OUT="$(cygpath -w "$ROOT/public/cv/Mohammed_Masoud_CV.pdf" 2>/dev/null || echo "$ROOT/public/cv/Mohammed_Masoud_CV.pdf")"
URL="file:///${SRC//\//}"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 \
  --print-to-pdf="$OUT" "$URL" 2>/dev/null
echo "Wrote $OUT"
