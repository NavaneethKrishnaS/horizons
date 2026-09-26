#!/usr/bin/env bash
#
# Turn a piece of footage into a hero clip, at both sizes.
#
#   ./scripts/encode-hero.sh <source> <slot> [start] [seconds] [crf]
#
#   ./scripts/encode-hero.sh ~/Downloads/backwaters.mov 2 4 6
#
# Writes public/video/hd/hero-<slot>.mp4 at 1920 wide and
# public/video/sd/hero-<slot>.mp4 at 1280. No audio track at all — a
# muted video with a silent track is kilobytes of nothing, and some
# browsers refuse to autoplay it.
#
# CRF is quality: lower is better and bigger, and 23 is a good
# default. Spend it where the eye looks. A dusk sky or a dark
# firelight frame wants 21 or 22, because a smooth gradient and a deep
# shadow are where compression shows as banding. Dense moving foliage
# can take 25 and nobody will see it — at 23 one such clip came out at
# nine megabytes on its own.
#
# The frame rate is kept from the source where that is sensible, which
# is why this asks ffprobe rather than forcing 25 on everything:
# 60 to 25 is not a whole division and the judder is visible.

set -euo pipefail

SRC=${1:?usage: encode-hero.sh <source> <slot 1-9> [start] [seconds] [crf]}
SLOT=${2:?which hero slot, 1 to 9}
START=${3:-0}
DURATION=${4:-6}
CRF=${5:-23}

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/public/video/hd" "$ROOT/public/video/sd"

SRC_FPS=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate \
  -of csv=p=0 "$SRC" | awk -F/ '{printf "%.0f", $1/$2}')

if [ "$SRC_FPS" -ge 50 ]; then FPS=30; else FPS=$SRC_FPS; fi

render() {
  ffmpeg -y -loglevel error -ss "$START" -t "$DURATION" -i "$SRC" -an \
    -vf "scale=$1:-2:flags=lanczos,fps=$FPS" \
    -c:v libx264 -preset slow -crf "$2" -pix_fmt yuv420p \
    -movflags +faststart "$3"
}

render 1920 "$CRF"          "$ROOT/public/video/hd/hero-$SLOT.mp4"
render 1280 $((CRF + 2))    "$ROOT/public/video/sd/hero-$SLOT.mp4"

# Slot 1 is what the page shows before anything plays.
if [ "$SLOT" = "1" ]; then
  ffmpeg -y -loglevel error -ss "$START" -i "$SRC" -frames:v 1 \
    -vf "scale=1920:-2:flags=lanczos" -q:v 3 \
    "$ROOT/public/images/hero/hero-poster.jpg"
fi

echo
ls -lh "$ROOT/public/video/hd/hero-$SLOT.mp4" "$ROOT/public/video/sd/hero-$SLOT.mp4"
echo
echo "source ${SRC_FPS}fps, encoded at ${FPS}fps, crf $CRF / $((CRF + 2))"
