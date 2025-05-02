# mwonbot

A discord bot built to provide commands and utilities for the melon king minigame on diamondfire

This bot includes various commands to convert currencies, lookup items and upgrades, check prices of various things among many other features

This repository also includes all data manually scraped from melon king that the bot depends on, if you have a project that needs this data, please use it! (and preferably give some credit :3)

## Development
### Planned Features:
- [x] Trophies
    - [x] `/trophy [number]` command
    - [x] Human Readable Trophy Data
    - [ ] Programmatic Trophy Data
- [x] Gift of Gold
    - [x] `/gog [number]` command
    - [x] Human Readable Gog Data
    - [ ] Programmatic Gog Data
- [x] Karma
    - [x] `/karma [number]` command
    - [x] Full Karma/Guard Data
- [/] Sign Upgrades
    - [ ] `/upgrade [name]` command
    - [/] Full Sign Data
        - [/] Beginnings
- [/] Item Lookup
    - [ ] `/item [name]` command
        - [ ] Item Valuation
        - [ ] Command Submenu navigation
        - [ ] Item Acquiring and Item Uses Subpages
    - [ ] Automatically Generated "How to get" Guides
    - [/] Full Item Data

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