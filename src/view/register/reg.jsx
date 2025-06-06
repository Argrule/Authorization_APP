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
            alertDialog("注册成功，助记词已自动复制到剪贴板，请妥善保存");
            // localStorage.setItem("name", name);
            // localStorage.setItem("addr", address);
            // localStorage.setItem("pvk", privateKey);
            // 复制助记词到剪贴板
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(mnemonic);
            }
            // 不再保存助记词到 localStorage
            return mnemonic; // 返回助记词以便在UI中显示
        } catch (error) {
            alertDialog("注册失败");
            console.error("Error during registration:", error);
            return "";
        }
    };

    const checkRegistered = async (name) => {
        try {
            const pubAddr = await contract.methods.verify(name).call();
            // 解析16进制的数值，判断是否为0
            if (parseInt(pubAddr, 16) === 0) {
                alertDialog("用户未注册");
            } else {
                alertDialog("用户已注册");
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