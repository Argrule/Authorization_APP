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

### operation

#### config page 

1. 配置当前登录要使用的 id + 助记词
2. 配置待连接以太坊节点的ip和端口、账户私钥和地址
3. ctrl + s 保存配置

#### login page 

展示当前登录的 id + 私钥

#### register page 

1. ready? 查看当前 id 是否被注册
2. register 生成一对助记词和地址，注册到区块链上
3. 生成的助记词、地址、私钥会被存储到本地，效果等于config page

#### setting page 

1. 仅填入id + 助记词，用于注销
2. 点击图标可以生成新的助记词和地址
3. 生成新地址后，点击可以更换已发布的地址

### core plugins

- web3.js  调用合约、哈希、签名、验证
- secp256k1 椭圆曲线签名恢复公钥，公钥用于后续加密
- @scure/bip39 @ethereumjs/wallet 生成助记词和私钥
- eciesjs  ECIES加密解密（结合ECDH和AES）

### Security Improvements

- [Y] 通过服务端缓存uuid，比对预防重发攻击
- [Y] 通过区块链存储用户的公钥，防止伪造
- [Y] 通过智能合约获取公钥，中间过程不经过网络信道，无法被干预
- [Y] 通过智能合约限制注册用户的数量，防止恶意注册
- [Y] 通过智能合约验证用户的身份，防止PKI被无权限人篡改
- [Y] 隐藏签名，注册时不暴露签名，只有销毁时使用签名（规定对id签名，不可能uuid重合），防止被重放攻击
- [Y] 通过公私钥加密，防止中间人攻击

### Next 

- [Y] 配置config页面，输入用户以太坊地址/私钥存入wallet+以太坊节点网络ip
- [Y] 读取私钥页面，或者在页面上显示私钥方便记忆，或许可以变换成助记词 bip39+@ethereumjs/wallet
- [ ] 登录认证完成之后发放token，token可以用来作为加密通信的对称密钥
- [X] 移植到rust完成web3交互 --没有必要加一层ipc通信
- [Y] 使用 http 完成前后端交互
- [Y] localstorage 保存私钥
- [Y] 精简contract
- [ ] 前端原生弹窗实现
- [Y] 注销功能，更新密钥功能
- [Y] 登录不要求提供助记词，config配置助记词，登录显示私钥且无法修改并脱敏
- [ ] 注册完成之后弹窗询问是否保存替换本地
- [Y] Nav Bar切换页面
- [Y] 智能合约的恢复密钥，和web3.js的没有匹配上 -> 被签名的message包含中文导致编码问题不一致

![ ] 注意，重新编译合约需要同步Auth.json给后端
![ ] 注意，react中使用闭包引用useState的值时，可能会导致闭包中引用的值不是最新的值（注册监听事件时，函数不变，但闭包已经过时了），所以需要使用useRef来保存最新的值，平时建议用纯函数


## Local Storage Configuration

- name: 当前登录的id
- mnemonic: 助记词
- addr: 当前用户公钥地址
- pvk: 当前用户私钥
- address: 以太坊账户地址
- privateKey: 以太坊账户私钥
- token: 登录认证后发放的token
