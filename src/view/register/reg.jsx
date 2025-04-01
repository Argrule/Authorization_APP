import useGetWeb3 from "@/web3/useGetWeb3";
import RegUI from "./container";

const Reg = () => {
    const { web3, accounts, contract, loading, error } = useGetWeb3();

    const handleRegister = async (name) => {
        const { address, privateKey } = web3.eth.accounts.create();
        localStorage.setItem("address", address);
        localStorage.setItem("privateKey", privateKey);

        try {
            // 获取估算的gas值
            const gasEstimate = await contract.methods.register(name, address).estimateGas();            
            const receipt = await contract.methods.register(name, address).send({ from: accounts[0], gasLimit: gasEstimate * 2n });
            alert("Register success");
            return receipt;
        } catch (error) {
            alert("Register failed");
            console.error("Error during registration:", error);
        }
    };

    const checkRegistered = async (name) => {
        try {
            const pubAddr = await contract.methods.verify(name).call();
            // 解析16进制的数值，判断是否为0
            if (parseInt(pubAddr, 16) === 0) {
                alert("User not registered, Yes");
            } else {
                alert("User registered, No!!!!");
                console.log(pubAddr);
            }
        } catch (error) {
            console.error("Test register failed:", error);
        }
    };

    if (web3 === null) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <RegUI register={handleRegister} test={checkRegistered} />
    )

}

export default Reg;