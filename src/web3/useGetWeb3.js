import { useState, useEffect } from 'react';
import getWeb3 from './getWeb3';
import AuthentitationContract from "@/contract/Auth.json";
import { alertDialog } from '@/component/DialogProvider';


const useGetWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fn = async () => {
      try {
        // 获取 web3 实例
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);

        // 获取账户列表
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(localStorage.getItem('address') || accounts[0]);

        // 获取网络 ID
        const networkId = await web3Instance.eth.net.getId();

        // 获取部署的网络信息
        const deployedNetwork = AuthentitationContract.networks[networkId];

        // 创建合约实例
        const instance = new web3Instance.eth.Contract(
          AuthentitationContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setContract(instance);
      } catch (error) {
        setError(error);        
        alertDialog("加载 Web3 或合约失败，请检查网络连接或合约配置。");
      } finally {
        setLoading(false);
      }
    };

    fn();
  }, []);

  return { web3, account, contract, loading, error };
};

export default useGetWeb3;