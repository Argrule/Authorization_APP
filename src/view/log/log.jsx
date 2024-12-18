import useGetWeb3 from "@/web3/useGetWeb3";
import LogUI from "./container";

const Log = () => {
  const { web3, accounts, contract, loading, error } = useGetWeb3();

  const login = async (name, password) => {
    await contract.methods.login(name, password).send({ from: accounts[0] });
  }

  if (web3 === null) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <LogUI login={login} />
  )

}

export default Log;