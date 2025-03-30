import useGetWeb3 from "@/web3/useGetWeb3";
import LogUI from "./container";
import { recoverPublicKey, signMessage } from "@/utils/privateKey";

const Log = () => {
  const { web3, accounts, contract, loading, error } = useGetWeb3();

  const login = async (name, password) => {
    const receipt = await contract.methods.login(name, password).send({ from: accounts[0] });

    console.log("login result =>", receipt);
  }
  const getStatus = async () => {
    console.log("get status!!!")
    const res = await contract.methods.getUserStatus().call({
      from: accounts[1]
    });
    console.log("get status =>", res);
    const demo_r = await contract.methods.getDemo().call({
      from: accounts[1]
    });
    console.log("get demo =>", demo_r);
    

    const acc = web3.eth.accounts.create();
    console.log("create a new account =>", acc);
    // 要签名的消息
    const message = 'Hello, ECDSA!';

    // 使用私钥对消息进行签名
    const signature = web3.eth.accounts.sign(message, acc.privateKey);

    console.log('Signature:', signature);

    /**
     * ! demo
     */
    const prefix = '\x19Ethereum Signed Message:\n' + message.length;
    const messageWithPrefix = prefix + message;
    const msgH = web3.utils.keccak256(messageWithPrefix);
    console.log("msgH =>", msgH);

    // 使用私钥对消息进行签名
    const sig = signMessage(msgH, acc.privateKey);
    console.log("signature =>", sig);

    // 使用签名还原公钥
    const pk = recoverPublicKey(signature.signature, msgH);
    console.log("还原出的公钥 => ", pk);
    // 验证公钥是否hash得到正确的地址
    const hash = web3.utils.keccak256(web3.utils.hexToBytes(pk)).slice(-40);
    console.log("pubKey hash =>", hash);
    // 使用公钥验证签名
    const recoveredAddress = web3.eth.accounts.recover(message, signature.signature);
    console.log('Recovered Address:', recoveredAddress);
  }

  if (web3 === null) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <LogUI login={login} getStatus={getStatus} />
  )

}

export default Log;