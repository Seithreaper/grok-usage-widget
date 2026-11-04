#!/bin/bash
# Installs Übersicht (if needed) and the usage widget.
set -e
WDIR="$HOME/Library/Application Support/Übersicht/widgets/usage"
if [ ! -d "/Applications/Übersicht.app" ]; then
  if command -v brew >/dev/null; then brew install --cask ubersicht
  else echo "Install Übersicht from https://tracesof.net/uebersicht/ first."; exit 1; fi
fi
mkdir -p "$WDIR"
SRC="$(cd "$(dirname "$0")" && pwd)/usage"
cp "$SRC/index.jsx" "$WDIR/index.jsx"
[ -f "$WDIR/usage.json" ] || cp "$SRC/usage.json" "$WDIR/usage.json"
# Launch with a clean environment so a stray NODE_PATH can't break widget bundling.
env -i HOME="$HOME" USER="$USER" PATH=/usr/bin:/bin:/usr/sbin:/sbin /usr/bin/open -a "Übersicht"
echo "Installed. The widget appears in the top-right of your desktop."
