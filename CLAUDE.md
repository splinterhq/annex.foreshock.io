# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`annex.foreshock.io` is a **static file-distribution site**, not an application. It hosts supporting/downloadable files (currently ML model artifacts) for Foreshock's open source products. There is no build, lint, or test tooling — the repository *is* the deployed content.

`public/` is the served web root; a path like `public/bin/models/aldous/1-2/Aldous_1-2.dece.xz` is served at `https://annex.foreshock.io/bin/models/aldous/1-2/Aldous_1-2.dece.xz`.

## Artifact conventions

Model artifacts live under `public/bin/models/<name>/<version>/` where the version directory uses a hyphen (e.g. `1-2`, not `1.2`). Each artifact is published as two files:

- `<Name>_<version>.dece.xz` — the artifact, xz-compressed (`XZ` container, CRC64). The uncompressed `.dece` payload is a custom binary format identified by a `TNLS` magic header.
- `<Name>_<version>.dece.sha256` — a `sha256sum`-format sidecar. **The checksum is of the decompressed `.dece` file, not the `.xz`.** The filename inside the sidecar is the decompressed name (`Aldous_1-2.dece`).

## Verifying an artifact

```bash
# Confirm a published artifact matches its sidecar (checksum is of the *decompressed* payload)
xz -dc <Name>_<ver>.dece.xz | sha256sum   # compare hash against <Name>_<ver>.dece.sha256
```

## Adding / updating an artifact

Given a `<Name>_<ver>.dece` payload, produce the two published files:

```bash
sha256sum <Name>_<ver>.dece > <Name>_<ver>.dece.sha256   # sidecar over the decompressed payload
xz -k <Name>_<ver>.dece                                  # -> <Name>_<ver>.dece.xz
```

Place both in `public/bin/models/<name>/<version>/`. Do not commit the uncompressed `.dece`; only the `.xz` and `.sha256` are distributed.
