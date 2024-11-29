import { useEffect, useState } from "react";
import AuthentitationContract from "../../contracts/Authentitation.json";
import getWeb3 from "../../web3/getWeb3";
import LogContainer from "./container";

const Log = () => {
  const [state, setState] = useState({
    web3: null,
    accounts: null,
    contract: null,
    name: '',
    password: ''
  })

  useEffect(() => {
    const fn = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = AuthentitationContract.networks[networkId];
        const instance = new web3.eth.Contract(
          AuthentitationContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setState({ web3, accounts, contract: instance });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
    fn();
  }, []);
  const register = async (name, password) => {
    await state.contract.methods.register(name, password).send({ from: state.accounts[0] });
  }

  const login = async (name, password) => {
    await state.contract.methods.login(name, password).send({ from: state.accounts[0] });
  }

  const runExample = async () => {
    const { accounts, contract } = state;
    await contract.methods.login("test", "123").send({ from: accounts[0] });

  };

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <LogContainer register={register} login={login} />
  )

}

export default Log;