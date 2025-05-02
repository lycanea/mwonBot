# mwonbot

A discord bot built to provide commands and utilities for the melon king minigame on diamondfire

This bot includes various commands to convert currencies, lookup items and upgrades, check prices of various things among many other features

This repository also includes all data manually scraped from melon king that the bot depends on, if you have a project that needs this data, please use it! (and preferably give some credit :3)

## Development
### Planned Features:
- 🚧(66%) Trophies
    - ✅ `/trophy [number]` command
    - ✅ Human Readable Trophy Data
    - [ ] Programmatic Trophy Data
- 🚧 (66%) Gift of Gold
    - ✅ `/gog [number]` command
    - ✅ Human Readable Gog Data
    - [ ] Programmatic Gog Data
- ✅ Karma
    - ✅ `/karma [number]` command
    - ✅ Full Karma/Guard Data
- 🚧(1%) Sign Upgrades
    - [ ] `/upgrade [name]` command
    - 🚧(1%) Full Sign Data
        - 🚧(1%) Beginnings
- 🚧(1%) Item Lookup
    - [ ] `/item [name]` command
        - [ ] Item Valuation
        - [ ] Command Submenu navigation
        - [ ] Item Acquiring and Item Uses Subpages
    - [ ] Automatically Generated "How to get" Guides
    - 🚧(1%) Full Item Data

### Hosting yourself:

this is all written in typescript and its ran with bun so uhh... use that lmao :3

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```