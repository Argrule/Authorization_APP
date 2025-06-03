import useGetWeb3 from "@/web3/useGetWeb3";
import RegUI from "./container";
import { generateAccount } from "@/utils/privateKey";
import { alertDialog } from '@/component/DialogProvider';

const Reg = () => {
    const { web3, account, contract, loading, error } = useGetWeb3();

    const handleRegister = async (name) => {
        // const { address, privateKey } = web3.eth.accounts.create();
        const { mnemonic, privateKey, address } = generateAccount();

        try {
            // 获取估算的gas值
            const gasEstimate = await contract.methods.register(name, address).estimateGas({ from: account });
            const receipt = await contract.methods.register(name, address).send({ from: account, gasLimit: gasEstimate * 2n });
            alertDialog("Register success");
            localStorage.setItem("name", name);
            localStorage.setItem("addr", address);
            localStorage.setItem("pvk", privateKey);
            localStorage.setItem("mnemonic", mnemonic);
            return receipt;
        } catch (error) {
            alertDialog("Register failed");
            console.error("Error during registration:", error);
        }
    };

    const checkRegistered = async (name) => {
        try {
            const pubAddr = await contract.methods.verify(name).call();
            // 解析16进制的数值，判断是否为0
            if (parseInt(pubAddr, 16) === 0) {
                alertDialog("User not registered, Yes");
            } else {
                alertDialog("User registered, No!!!!");
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