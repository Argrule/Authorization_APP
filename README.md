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
- [Y] 读取私钥页面，或者在页面上显示私钥方便记忆，或许可以变换成助记词 bip39+@ethereumjs/wallet
- [ ] 登录认证完成之后发放token，token可以用来作为加密通信的对称密钥
- [X] 移植到rust完成web3交互 --没有必要加一层ipc通信
- [Y] 使用 http 完成前后端交互
- [Y] localstorage 保存私钥
- [ ] 精简contract
- [ ] 前端原生弹窗实现
- [Y] 注销功能，更新密钥功能
- [Y] 登录不要求提供助记词，config配置助记词，登录显示私钥且无法修改并脱敏
- [ ] 注册完成之后弹窗询问是否保存替换本地
- [Y] Nav Bar切换页面
- [Y] 智能合约的恢复密钥，和web3.js的没有匹配上 -> 被签名的message包含中文导致编码问题不一致

![ ] 注意，重新编译合约需要同步Auth.json给后端
![ ] 注意，react中使用闭包引用useState的值时，可能会导致闭包中引用的值不是最新的值（注册监听事件时，函数不变，但闭包已经过时了），所以需要使用useRef来保存最新的值，平时建议用纯函数