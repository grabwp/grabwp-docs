#!/usr/bin/env python3
"""Sync docs/images/ from the admin-screenshot library (SSOT).

Library = ~/project-hub/grabwp/assets/admin-screenshots (slug -> <slug>.png).
Map     = docs-image-map.json (auto: copy/crop from library; manual: leave + warn).

Run after every library re-shoot so docs screenshots stay up to date:
    python3 scripts/sync_docs_images.py            # sync
    python3 scripts/sync_docs_images.py --check     # dry-run, exit 1 if drift/missing

Auto entry: {"src": "<library-slug>", "crop": "x,y,w,h"?}  (crop optional).
Copies library/<src>.png -> docs/images/<key>. Requires ImageMagick `convert` for crop.
"""
import json, os, subprocess, sys, hashlib, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB  = os.path.expanduser("~/project-hub/grabwp/assets/admin-screenshots")
IMG  = os.path.join(ROOT, "docs", "images")
# VI i18n keeps its own duplicate images dir; mirror EN into it so `npm run build`
# (onBrokenMarkdownImages: throw) does not fail on the /vi/ locale.
VI_IMG = os.path.join(ROOT, "i18n", "vi",
                      "docusaurus-plugin-content-docs", "current", "images")
MAP  = os.path.join(ROOT, "docs-image-map.json")
CHECK = "--check" in sys.argv


def sha(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(65536), b""):
            h.update(b)
    return h.hexdigest()


def main():
    m = json.load(open(MAP))
    auto, manual = m.get("auto", {}), m.get("manual", {})
    changed, missing, ok = [], [], []

    for key, spec in auto.items():
        src = os.path.join(LIB, spec["src"] + ".png")
        dst = os.path.join(IMG, key)
        if not os.path.exists(src):
            missing.append((key, spec["src"]))
            continue
        # produce candidate (crop or straight copy) into a temp, compare, then place
        tmp = dst + ".tmp"
        crop = spec.get("crop")
        if crop:
            x, y, w, h = crop.split(",")
            subprocess.run(["convert", src, "-crop", f"{w}x{h}+{x}+{y}", "+repage", tmp],
                           check=True)
        else:
            shutil.copyfile(src, tmp)
        if os.path.exists(dst) and sha(dst) == sha(tmp):
            os.remove(tmp)
            ok.append(key)
        else:
            if CHECK:
                os.remove(tmp)
                changed.append(key)
            else:
                os.replace(tmp, dst)
                changed.append(key)

    print(f"AUTO: {len(auto)} mapped | {len(ok)} up-to-date | "
          f"{'drift' if CHECK else 'updated'}: {len(changed)} | missing src: {len(missing)}")
    for k in changed:
        print(f"  {'DRIFT' if CHECK else 'SYNCED'}  {k}  <- {auto[k]['src']}")
    for k, s in missing:
        print(f"  MISSING library screen '{s}.png' for {k}  (re-shoot the library)")
    if manual:
        print(f"\nMANUAL ({len(manual)}) — not auto-synced, re-capture/crop by hand when UI changes:")
        for k, spec in manual.items():
            print(f"  {k}  ({spec.get('reason','')})")

    if missing:
        sys.exit(2)
    if CHECK and changed:
        print("\n[--check] docs images are STALE vs library. Run without --check to sync.")
        sys.exit(1)

    # Mirror EN docs/images -> VI i18n images so the /vi/ build resolves them too.
    if not CHECK and os.path.isdir(VI_IMG):
        for f in os.listdir(IMG):
            s, d = os.path.join(IMG, f), os.path.join(VI_IMG, f)
            if not (os.path.exists(d) and sha(s) == sha(d)):
                shutil.copyfile(s, d)
        # drop VI files that no longer exist in EN (e.g. old .jpg)
        for f in os.listdir(VI_IMG):
            if not os.path.exists(os.path.join(IMG, f)):
                os.remove(os.path.join(VI_IMG, f))
        print(f"\nVI mirror: {VI_IMG} synced to match docs/images/")

    sys.exit(0)


if __name__ == "__main__":
    main()
