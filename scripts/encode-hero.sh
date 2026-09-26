#!/usr/bin/env bash
#
# Turn a piece of footage into a hero loop the web can carry.
#
#   ./scripts/encode-hero.sh ~/Downloads/backwaters.mov [start] [seconds]
#
# Writes public/video/hero.mp4, public/video/hero.webm and
# public/images/hero/hero-poster.jpg — the poster is the loop's own
# first frame, so the still and the film line up exactly and there is
# no jump when one fades into the other.
#
# 1920 wide, no audio track at all (a muted video with silent audio is
# still kilobytes of nothing, and some browsers refuse to autoplay it).

set -euo pipefail

SRC=${1:?usage: encode-hero.sh <source> [start-seconds] [duration-seconds]}
START=${2:-0}
DURATION=${3:-14}

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/public/video" "$ROOT/public/images/hero"

COMMON=(-ss "$START" -t "$DURATION" -i "$SRC" -an
        -vf "scale=1920:-2:flags=lanczos,fps=25" -movflags +faststart)

ffmpeg -y "${COMMON[@]}" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p \
  "$ROOT/public/video/hero.mp4"

ffmpeg -y "${COMMON[@]}" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 \
  "$ROOT/public/video/hero.webm"

ffmpeg -y -ss "$START" -i "$SRC" -frames:v 1 \
  -vf "scale=1920:-2:flags=lanczos" -q:v 4 \
  "$ROOT/public/images/hero/hero-poster.jpg"

echo
ls -lh "$ROOT/public/video/hero.mp4" "$ROOT/public/video/hero.webm" \
       "$ROOT/public/images/hero/hero-poster.jpg"
echo
echo "If hero.mp4 is much over 6MB, raise the crf (28, 30) or shorten it."
