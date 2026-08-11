#!/usr/bin/env python3
"""Regenerate src/data/imageDimensions.js from the files in src/assets.

Intrinsic width/height on every <img> is what stops the page reflowing as
pictures arrive, and it keeps the entrance animation measuring a correctly
sized hero box. Reading the numbers off disk means they cannot drift from the
actual files the way hand-written attributes do.

Run after changing or re-encoding anything under src/assets:
    python3 scripts/generate-image-dimensions.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"
OUT = ROOT / "src" / "data" / "imageDimensions.js"

EXTS = {".png", ".jpg", ".jpeg", ".webp"}

HEADER = """// GENERATED FILE - do not edit by hand.
// Regenerate with: python3 scripts/generate-image-dimensions.py
//
// Maps each asset's file name to its intrinsic pixel size so <img> tags can
// carry width/height and reserve layout space before the bytes arrive.

export const imageDimensions = {
"""

FOOTER = """}

// Bundled asset URLs keep the original file name plus a content hash, so the
// last path segment up to the hash is enough to find the entry.
export function getImageDimensions(src) {
  if (typeof src !== 'string') return null
  const fileName = src.split('/').pop()?.split('?')[0]
  if (!fileName) return null
  if (imageDimensions[fileName]) return imageDimensions[fileName]

  const match = /^(.*)-[A-Za-z0-9_-]{8,}(\\.[a-z]+)$/.exec(fileName)
  if (match) return imageDimensions[`${match[1]}${match[2]}`] ?? null
  return null
}
"""


def main() -> int:
    entries = {}
    for path in sorted(ASSETS.rglob("*")):
        if path.suffix.lower() not in EXTS:
            continue
        with Image.open(path) as img:
            if path.name in entries and entries[path.name] != img.size:
                raise SystemExit(
                    f"duplicate file name with different size: {path.name}"
                )
            entries[path.name] = img.size

    lines = [
        f"  {name!r}: {{ width: {w}, height: {h} }},".replace("'", "'")
        for name, (w, h) in sorted(entries.items())
    ]
    OUT.write_text(HEADER + "\n".join(lines) + "\n" + FOOTER, encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)} with {len(entries)} entries")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
