import useGetWeb3 from "@/web3/useGetWeb3";
import LogUI from "./container";
import { generateAccountWithMnemonic, decryptWithPrivateKey } from "@/utils/privateKey";
import { start, login } from "@/api/auth";
import { alertDialog } from '@/component/DialogProvider';

const Log = () => {
  const { web3, account, contract, loading, error } = useGetWeb3();

  const handleLogin = async (name, privateKey) => {
    const uuid = await start(name);
    let pvtK = privateKey;
    if (!pvtK) {
      alertDialog('请输入私钥');
      return;
    }
    // 使用私钥对消息进行签名
    const { signature } = web3.eth.accounts.sign(uuid, pvtK);
    const { code: res_status, data: ec_msg } = await login(name, uuid, signature);
    if (res_status === 0) {
      // 私钥进行解密
      const dc_msg = decryptWithPrivateKey(ec_msg, pvtK);
      localStorage.setItem("token", dc_msg);
      alertDialog("Login success");
    } else {
      alertDialog("Login failed");
    }
  }
  const getStatus = async (name) => {
    /**
     * ! demo
     */
    // const prefix = '\x19Ethereum Signed Message:\n' + message.length;
    // const messageWithPrefix = prefix + message;
    // const msgH = web3.utils.keccak256(messageWithPrefix);
    // console.log("msgH =>", msgH);

    // 使用私钥对消息进行签名
    // const sig = signMessage(msgH, acc.privateKey);
    // console.log("signature =>", sig);

    // // 使用签名还原公钥
    // const pk = recoverPublicKey(signature.signature, msgH);
    // console.log("还原出的公钥 => ", pk);
    // // 验证公钥是否hash得到正确的地址
    // const hash = web3.utils.keccak256(web3.utils.hexToBytes(pk)).slice(-40);
    // console.log("pubKey hash =>", hash);
    // // 使用公钥验证签名
    // const recoveredAddress = web3.eth.accounts.recover(message, signature.signature);
    // console.log('Recovered Address:', recoveredAddress);
  }

  if (web3 === null) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <LogUI login={handleLogin} />
  )

}

export default Log;