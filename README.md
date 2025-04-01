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

### Next 

- [ ] 配置config页面，输入用户以太坊地址/私钥存入wallet+以太坊节点网络ip
- [ ] 读取私钥页面，或者在页面上显示私钥方便记忆，或许可以变换成助记词
- [ ] 登录认证完成之后发放token，token可以用来作为加密通信的对称密钥
- [X] 移植到rust完成web3交互
- [Y] 使用 http 完成前后端交互
- [Y] localstorage 保存私钥
- [ ] 精简contract