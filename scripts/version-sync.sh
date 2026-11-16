#!/usr/bin/env bash
# Checks the version agrees in package.json and package-lock.json, and, given
# a tag, that the tag names that version. release.yml and prepare-release.yml
# run it before anything is published.
#
#   scripts/version-sync.sh           # package.json == package-lock.json
#   scripts/version-sync.sh v0.2.0    # ... and == the tag
set -euo pipefail
cd "$(dirname "$0")/.."

pkg=$(jq -r .version package.json)
lock=$(jq -r '.packages[""].version' package-lock.json)
echo "package.json:      $pkg"
echo "package-lock.json: $lock"
rc=0
[ "$pkg" = "$lock" ] || { echo "error: package-lock.json has $lock, package.json has $pkg" >&2; rc=1; }
if [ $# -ge 1 ]; then
    echo "tag:               ${1#v}"
    [ "$pkg" = "${1#v}" ] || { echo "error: tag $1 does not match package.json $pkg" >&2; rc=1; }
fi
[ $rc -eq 0 ] && echo "ok: $pkg"
exit $rc
