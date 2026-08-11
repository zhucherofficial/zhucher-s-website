#!/usr/bin/env python3
"""Downscale and re-encode oversized project media in place.

Page content maxes out around 800 CSS px, so 1600 px covers 2x DPR displays.
Photographs become WebP; charts and diagrams stay lossless-ish WebP so thin
axis lines and small type do not smear. A candidate is only written when it
is meaningfully smaller than the original, so nothing gets worse.
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"

MAX_EDGE = 1600
MIN_GAIN = 0.90  # keep only if the new file is <= 90% of the original

# Charts, plots and rendered diagrams: keep crisp lines, allow near-lossless.
CHART_HINTS = (
    "chart", "confusion", "benchmark", "spectra", "regression", "scatter",
    "histogram", "resolution", "summary", "iteration", "stability",
    "response", "model", "event", "unet", "peak-vs", "leaderboard",
    "concentration", "mcr-", "physics-",
)


def is_chart(path: Path) -> bool:
    name = path.name.lower()
    return path.suffix.lower() == ".png" and any(h in name for h in CHART_HINTS)


def encode(img: Image.Image, dest: Path, chart: bool) -> None:
    if chart:
        img.save(dest, "WEBP", lossless=True, quality=100, method=6)
    else:
        img.save(dest, "WEBP", quality=82, method=6)


def process(path: Path, apply: bool) -> tuple[int, int, str]:
    original = path.stat().st_size
    with Image.open(path) as img:
        img.load()
        has_alpha = img.mode in ("RGBA", "LA") or "transparency" in img.info
        work = img.convert("RGBA" if has_alpha else "RGB")

        width, height = work.size
        scale = min(1.0, MAX_EDGE / max(width, height))
        if scale < 1.0:
            work = work.resize(
                (round(width * scale), round(height * scale)),
                Image.LANCZOS,
            )

        chart = is_chart(path)
        tmp = path.with_suffix(path.suffix + ".tmp.webp")
        encode(work, tmp, chart)

    candidate = tmp.stat().st_size
    if candidate > original * MIN_GAIN:
        tmp.unlink()
        return original, original, "kept"

    final = path.with_suffix(".webp")
    if apply:
        tmp.replace(final)
        if final != path:
            path.unlink()
    else:
        tmp.unlink()
    return original, candidate, "webp"


def main() -> int:
    apply = "--apply" in sys.argv
    # Generated WebP outputs are deliberately excluded so repeat runs cannot
    # accumulate another lossy encode over the same image.
    targets = sorted(
        p for p in ASSETS.rglob("*")
        if p.suffix.lower() in {".png", ".jpg", ".jpeg"}
    )

    before = after = 0
    changed = []
    for path in targets:
        original, new, action = process(path, apply)
        before += original
        after += new
        if action != "kept":
            changed.append((path.relative_to(ASSETS), original, new))

    for rel, o, n in sorted(changed, key=lambda r: r[1] - r[2], reverse=True):
        print(f"{str(rel):<64} {o // 1024:>6}KB -> {n // 1024:>6}KB")

    reduction = 100 * (before - after) / before if before else 0
    print(f"\n{len(changed)} of {len(targets)} files re-encoded")
    print(f"total {before / 1048576:.1f}MB -> {after / 1048576:.1f}MB "
          f"({reduction:.0f}% smaller)")
    if not apply:
        print("\ndry run - pass --apply to write")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
