import useGetWeb3 from "@/web3/useGetWeb3";
import RegUI from "./container";

const Reg = () => {
    const { web3, accounts, contract, loading, error } = useGetWeb3();

    const register = async (name, password) => {
        await contract.methods.register(name, password).send({ from: accounts[0], gas: 1000000 });
    }

    if (web3 === null) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <RegUI register={register} />
    )

}

export default Reg;