#!/usr/bin/env bash
# Toggle maintenance mode on the Davidsons Lens server.
#   ./maintenance-mode.sh on     -> public sees the 503 maintenance page
#   ./maintenance-mode.sh off    -> site live again
#   ./maintenance-mode.sh status -> current state
# No nginx reload required; the flag file is checked per request.
set -euo pipefail
FLAG=/var/www/maintenance/.enabled
case "${1:-status}" in
  on)     sudo touch "$FLAG"; echo "MAINTENANCE: ON  (public sees the maintenance page)";;
  off)    sudo rm -f "$FLAG"; echo "MAINTENANCE: OFF (site is live)";;
  status) [ -f "$FLAG" ] && echo "MAINTENANCE: ON" || echo "MAINTENANCE: OFF";;
  *)      echo "usage: $0 {on|off|status}" >&2; exit 1;;
esac
