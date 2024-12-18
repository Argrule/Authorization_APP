import { useState, useEffect } from 'react';
import getWeb3 from './getWeb3';
import AuthentitationContract from "@/contracts/Authentitation.json";

const useGetWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
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
        setAccounts(accounts);

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
        console.error(error);
        alert('Failed to load web3, accounts, or contract. Check console for details.');
      } finally {
        setLoading(false);
      }
    };

    fn();
  }, []);

  return { web3, accounts, contract, loading, error };
};

export default useGetWeb3;