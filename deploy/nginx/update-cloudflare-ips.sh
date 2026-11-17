#!/usr/bin/env bash
# Refresh /etc/nginx/cloudflare-ips.conf from Cloudflare's published address ranges.
#
# The site config only accepts connections from Cloudflare (geo $dl_from_cloudflare), so this
# list must stay current: if Cloudflare adds a range and it is missing here, visitors routed
# through it would be refused. Installed on the server as /usr/local/sbin/update-cloudflare-ips
# and run weekly from /etc/cron.weekly/update-cloudflare-ips. Safe to run by hand any time:
#   sudo /usr/local/sbin/update-cloudflare-ips
# It keeps the current list if the download looks wrong, and restores it if nginx rejects the
# new one.
set -euo pipefail

OUT=/etc/nginx/cloudflare-ips.conf
TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

{
  echo "# Cloudflare address ranges, generated $(date -u +%F) by update-cloudflare-ips. Do not edit by hand."
  for v in 4 6; do
    curl -fsS --max-time 20 "https://www.cloudflare.com/ips-v$v" \
      | tr -d '\r' \
      | grep -E '^[0-9a-fA-F:.]+/[0-9]{1,3}$' \
      | sed 's/$/ 1;/'
  done
} > "$TMP"

count=$(grep -c ' 1;$' "$TMP" || true)
if [ "$count" -lt 10 ]; then
  echo "Only $count ranges downloaded; keeping the current list." >&2
  exit 1
fi

if [ -f "$OUT" ] && diff -q <(grep -v '^#' "$OUT") <(grep -v '^#' "$TMP") > /dev/null; then
  echo "No change ($count ranges)."
  exit 0
fi

[ -f "$OUT" ] && cp -p "$OUT" "$OUT.bak"
install -m 644 "$TMP" "$OUT"

if nginx -t 2> /dev/null; then
  systemctl reload nginx
  echo "Updated: $count ranges."
else
  if [ -f "$OUT.bak" ]; then cp -p "$OUT.bak" "$OUT"; fi
  echo "nginx rejected the new list; previous list restored." >&2
  exit 1
fi
