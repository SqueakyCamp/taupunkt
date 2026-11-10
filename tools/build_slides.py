#!/usr/bin/env python3
"""Rendert die PDFs aus source/ als JPEG und legt sie AES-GCM-verschluesselt nach site/slides/.
Die Folien gehoeren der LV (FH Campus Wien) und landen nicht im Klartext im oeffentlichen Repo.
Gescannte Seiten (fokus 189-206) liegen im PDF um 90 Grad gedreht und werden hier aufgerichtet."""
import io, json, re, secrets
from pathlib import Path
import pymupdf
from PIL import Image
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ROOT = Path(__file__).resolve().parent.parent
DOCS = {  # id -> (Datei, Name, gedrehte Seiten)
    "g": ("fokus.pdf", "VO Gebäudephysik I – Folien", set(range(189, 207))),
    "f": ("formel.pdf", "Formelsammlung", set()),
    "p": ("pruefung.pdf", "Prüfung 1. Termin (mit Markierungen)", set()),
}
ITERS = 200_000


def clean(t):
    lines = [s.strip() for s in t.splitlines()]
    lines = [s for s in lines if s and not re.fullmatch(r"\d{1,3}", s)
             and s not in ("FH Campus Wien |", "Organisationseinheit | Titel")]
    return " ".join(lines)


def main():
    pw = (ROOT / ".slide-passphrase").read_text().strip().encode()
    out_root = ROOT / "site/slides"
    salt_file = out_root / "salt.txt"
    if salt_file.exists():
        salt = bytes.fromhex(salt_file.read_text().strip())
    else:
        salt = secrets.token_bytes(16)
        salt_file.write_text(salt.hex())
    key = PBKDF2HMAC(hashes.SHA256(), 32, salt, ITERS).derive(pw)
    a = AESGCM(key)

    def seal(b):
        iv = secrets.token_bytes(12)
        return iv + a.encrypt(iv, b, None)

    (out_root / "check.bin").write_bytes(seal(b"taupunkt-ok"))
    manifest = {"iters": ITERS, "docs": {}}
    total = 0
    for did, (fn, name, rotated) in DOCS.items():
        pdf = pymupdf.open(ROOT / "source" / fn)
        out = out_root / did
        out.mkdir(parents=True, exist_ok=True)
        texts = {}
        for i, page in enumerate(pdf):
            n = i + 1
            w = page.rect.width
            target = 1400 if (w > page.rect.height or n in rotated) else 1100
            if n in rotated:
                m = target / page.rect.height
            else:
                m = target / w
            pix = page.get_pixmap(matrix=pymupdf.Matrix(m, m), alpha=False)
            im = Image.open(io.BytesIO(pix.tobytes("png")))
            if n in rotated:
                im = im.rotate(-90, expand=True)
            buf = io.BytesIO()
            im.convert("RGB").save(buf, "JPEG", quality=70, optimize=True, progressive=True)
            data = buf.getvalue()
            (out / f"{n:03d}.bin").write_bytes(seal(data))
            total += len(data)
            texts[n] = clean(page.get_text())
        (out / "text.bin").write_bytes(seal(json.dumps(texts, ensure_ascii=False).encode()))
        manifest["docs"][did] = {"name": name, "pages": len(pdf)}
        print(did, name, len(pdf), flush=True)
    (out_root / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1))
    print("MB", round(total / 1e6, 1))


main()
