# Tauri + React

This template should help get you started developing with Tauri and React in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## Project setup

```bash
pnpm install
pnpm install -g truffle
```

### Compiles & Migrate & Test - Contracts

```bash
pnpm compile # or truffle compile --config truffle-config.cjs
pnpm migrate # or truffle migrate --config truffle-config.cjs
pnpm test # or truffle test --config truffle-config.cjs
```

### Compiles and hot-reloads for development - Tauri-APP

```bash
pnpm run tauri dev
```