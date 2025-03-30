import useGetWeb3 from "@/web3/useGetWeb3";
import RegUI from "./container";

const Reg = () => {
    const { web3, accounts, contract, loading, error } = useGetWeb3();

    const register = async (name, password) => {
        try {            
            const gasEstimate = await contract.methods.register(name, password).estimateGas({ from: accounts[0] });
            // const gasEstimate = 100000; // 估算的 Gas            
            const receipt = await contract.methods.register(name, password).send({
                from: accounts[0],
                gas: gasEstimate // 使用估算的 Gas
            });

            console.log("Registration successful:", receipt);
            return receipt; // 返回交易收据
        } catch (error) {
            console.error("Registration failed:", error);
            console.log('===>',error.message)
            // 可以根据需要抛出错误或返回特定的状态
            throw error; // 重新抛出错误以便上层处理
        }
    };
    const handleRegister = async (name, password) => {
        try {
            const receipt = await register(name, password);
            console.log("User registered successfully:", receipt);
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    if (web3 === null) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <RegUI register={handleRegister} />
    )

}

export default Reg;